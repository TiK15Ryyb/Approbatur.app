'use client'

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ProgressBar } from './ProgressBar/ProgressBar';
import { Badges } from '../Badges/Badges';
import { getCrawl } from '@/lib/getCrawl';
import { useSearchParams } from "next/navigation"

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

interface Props {
  crawl?: any;
}

const MapView: React.FC<Props> = () => {
  const params = useSearchParams()
  const crawlId = params.get("crawlId")

  const [crawl, setCrawl] = useState<any>(null);

  useEffect(() => {
    const fetchCrawl = async () => {
      const data = await getCrawl(crawlId as string);
      setCrawl(data);
    };

    fetchCrawl();
  }, [crawlId]);

  const [viewport, setViewport] = useState<Viewport>({
    latitude: crawl?.location.latitude || 0,
    longitude: crawl?.location.longitude || 0,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  useEffect(() => {
    if (crawl) {
      setViewport({
        latitude: crawl?.location.latitude,
        longitude: crawl?.location.longitude,
        zoom: 14,
        bearing: 0,
        pitch: 0
      });
    }
  }, [crawl]);

  const [selectedBar, setSelectedBar] = useState<any>(crawl?.bars[0]);
  const [visitedBars, setVisitedBars] = useState<Array<any>>([]);
  useEffect(() => {
    const visitedBars = localStorage.getItem('visitedBars');
    if (visitedBars) {
      setVisitedBars(JSON.parse(visitedBars));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('visitedBars', JSON.stringify(visitedBars));
  }, [visitedBars]);

  const [justVisited, setJustVisited] = useState(false);

  
  //Create and store user id in cookies
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    if (userId === null) {
      const userId = localStorage.getItem('userId');
      if (userId === null) {
        const newUserId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('userId', newUserId);
        setUserId(newUserId);
      } else {
        setUserId(userId);
      }
    }
  }, [userId]);


  const completionLimits = [ { limit: 2 }, { limit: 3 }, { limit: 5 }]

  const visitedBarsCount = visitedBars.length

  const canComplete = completionLimits.some(limitObj => visitedBarsCount >= limitObj.limit )
  

  const navigateToSummaryScreen = () => {
    localStorage.setItem('completedBars', JSON.stringify(visitedBarsCount));
    window.location.href = "/report?crawlId=" + crawlId;
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

  if (!crawl) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <ProgressBar totalBars={crawl?.bars.length} visitedBars={visitedBarsCount}/>
      <Badges visitedBars={visitedBarsCount} totalBars={crawl.bars.length}/>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={TOKEN}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width:'100vw', height:'100vh' }}
      >
        { !crawl?.bars.length &&
          <div className="grey-opacity-overlay absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-20 bg-slate-300">
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-2xl font-bold">Crawl was not found.</p>
            </div>
          </div>
        }
        {crawl?.bars.map((bar: any) => (
          <Marker key={`${bar.name}${bar.id}`} latitude={bar.location.latitude} longitude={bar.location.longitude}>
            <button
              className="marker-btn flex flex-col items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation()
                setSelectedBar(bar);
              }}
            >
              <p>{bar.name}</p>
              <img className="h-8 w-8" src={visitedBars.includes(bar.id) ? "visited-beer.svg" : "beer.svg"} alt="Beer Icon" />
          </button>
          </Marker>
        ))}

        {selectedBar ? (
          <Popup
            latitude={selectedBar.location.latitude}
            longitude={selectedBar.location.longitude}
            onClose={() => {
              setSelectedBar(null);
            }}
          >
            <div>
            <h2>{selectedBar.name}</h2>
            <p>{selectedBar.address}</p>
          { visitedBars.includes(selectedBar.id) 
            ? <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  const newVisitedBars = visitedBars.filter((barId) => barId !== selectedBar.id);
                  setVisitedBars(newVisitedBars);
                }}
              >
                Revert status
              </button>
            : <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                const newVisitedBars = [...(visitedBars.filter(barId => barId !== selectedBar.id)), selectedBar.id];
                setVisitedBars(newVisitedBars);
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
