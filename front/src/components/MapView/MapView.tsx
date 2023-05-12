'use client'

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ProgressBar } from './ProgressBar/ProgressBar';
import { BarCrawlData } from '@/data/BarCrawlData';
import { Badges } from '../Badges/Badges';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

const MapView: React.FC = () => {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: BarCrawlData[0].location.lat,
    longitude: BarCrawlData[0].location.lng,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });
  const [selectedBar, setSelectedBar] = useState<any>(BarCrawlData[0]);
  const [visitedBars, setVisitedBars] = useState(new Array(BarCrawlData.length).fill(false));
  const [justVisited, setJustVisited] = useState(false);

  const completionLimits = [ { limit: 2 }, { limit: 3 }, { limit: 5 }]

  const visitedBarsCount = visitedBars.filter(x => x).length

  const canComplete = completionLimits.some(limitObj => visitedBarsCount >= limitObj.limit )
  

  const navigateToSummaryScreen = () => {
    window.location.href = "/report"
  }

  const handleFinish = () => {
      if (window.confirm("Are you sure you want to finish the Appro?")) {
        navigateToSummaryScreen();
      }
    }
  
  useEffect(() => {
    const listener = (e: any) => {
      if (e.key === "Escape") {
        setSelectedBar(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <ProgressBar totalBars={BarCrawlData.length} visitedBars={visitedBarsCount}/>
      <Badges visitedBars={visitedBarsCount} />
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={TOKEN}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width:'100vw', height:'100vh' }}
      >
        {BarCrawlData.map((bar) => (
          <Marker key={bar.id} latitude={bar.location.lat} longitude={bar.location.lng}>
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation()
                setSelectedBar(bar);
              }}
            >
              <p>{bar.name}</p>
            <img src={visitedBars[bar.id] ? "visited-beer.svg" : "beer.svg"} alt="Beer Icon" />
          </button>
          </Marker>
        ))}

        {selectedBar ? (
          <Popup
            latitude={selectedBar.location.lat}
            longitude={selectedBar.location.lng}
            onClose={() => {
              setSelectedBar(null);
            }}
          >
            <div>
            <h2>{selectedBar.name}</h2>
            <p>{selectedBar.address}</p>
          { visitedBars[selectedBar.id] 
            ? <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  let newVisitedBars = [...visitedBars];
                  newVisitedBars[selectedBar.id] = false;
                  setVisitedBars(newVisitedBars);
                }}
              >
                Revert status
              </button>
            : <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                let newVisitedBars = [...visitedBars];
                newVisitedBars[selectedBar.id] = true;
                setVisitedBars(newVisitedBars);
                setSelectedBar(null);
                setJustVisited(true);
                setTimeout(() => setJustVisited(false), 2000);
              }}
            
            >
              Mark completed
            </button>
          }
            </div>
          </Popup>
        ) : null}
        
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
          <FullscreenControl />
          <GeolocateControl 
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>
        {justVisited ? <div className="absolute z-20 bottom-1 left-0 p-3 m-3 bg-green-400 rounded text-black">Marked as visited!</div> : null}
        {canComplete ? (
          <button className="z-20 fixed bottom-0 right-0 m-5 p-3 bg-blue-500 text-white rounded" onClick={handleFinish}>
            Finish Appro
          </button>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export { MapView };
