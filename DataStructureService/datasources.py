from typing import Union, Literal
import json
import requests
from flask_sqlalchemy import SQLAlchemy
from models import Bar


def prepare_openstreetmap_query(
    amenity: Union[Literal["pub"], Literal["bar"], Literal["biergarten"]],
    center_lat: float,
    center_lon: float,
    radius_m: int = 2000,
) -> requests.PreparedRequest:
    params = {
        # Including 'way' clauses here would have better coverage of amenities, but getting their location is more complicated.
        "data": f"""[out:json][timeout:25];(node["amenity"={amenity}](around:{radius_m},{center_lat},{center_lon}););out;>;out skel qt;""",
    }
    r = requests.Request(
        "GET", "https://overpass-api.de/api/interpreter", params=params
    ).prepare()
    return r


def populate_palma_nova_bars(db: SQLAlchemy) -> None:
    with requests.Session() as s:
        try:
            pubs_resp = s.send(
                prepare_openstreetmap_query("pub", 39.5196484, 2.5314351)
            )
            pubs = pubs_resp.json()["elements"]
        except json.decoder.JSONDecodeError as err:
            print("Failed to fetch pubs from OpenStreetMap API, assuming empty: ", err)
            print(pubs_resp.status_code)
            print(pubs_resp.text)

        try:
            bars_resp = s.send(
                prepare_openstreetmap_query("bar", 39.5196484, 2.5314351)
            )
            bars = bars_resp.json()["elements"]
        except json.decoder.JSONDecodeError as err:
            print("Failed to fetch bars from OpenStreetMap API, assuming empty: ", err)
            print(bars_resp.status_code)
            print(bars_resp.text)

        try:
            biergartens_resp = s.send(
                prepare_openstreetmap_query("biergarten", 39.5196484, 2.5314351)
            )
            biergartens = biergartens_resp.json()["elements"]
        except json.decoder.JSONDecodeError as err:
            print(
                "Failed to fetch biergartens from OpenStreetMap API, assuming empty: ",
                err,
            )
            print(biergartens_resp.status_code)
            print(biergartens_resp.text)

    def queue_insert_bar_if_missing(location_info: dict) -> None:
        location_id = location_info["id"]
        latitude = location_info["lat"]
        longitude = location_info["lon"]
        try:
            name = location_info["tags"]["name"]
        except KeyError:
            name = "UNKNOWN_NAME"

        entry = db.session.query(Bar).filter(Bar.id == location_id).first()
        if entry is not None:
            return
        db.session.add(
            Bar(
                # TODO: The ID might not be persistent on the API. Need to find a persistent ID for our needs.
                id=location_id,
                name=name,
                # Coordinates are lat and long in WGS84 format
                latitude=latitude,
                longitude=longitude,
            )
        )

    for pub in pubs:
        queue_insert_bar_if_missing(pub)
    for bar in bars:
        queue_insert_bar_if_missing(bar)
    for biergarten in biergartens:
        queue_insert_bar_if_missing(biergarten)

    db.session.commit()
