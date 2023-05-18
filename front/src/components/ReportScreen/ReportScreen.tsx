'use client'

import { memo } from 'react';
import type { FC } from 'react';
import { Badges } from '../Badges/Badges';

interface Props {
  className?: string;
  crawl: any;
}

export const ReportScreen: FC<Props> = memo(function ReportScreen({ className, crawl }) {
  const visitedBarsIds = JSON.parse(localStorage.getItem('visitedBars') || '[]');
  const userId = localStorage.getItem('userId');
  const completedBars = crawl.bars.filter((bar: any) => visitedBarsIds.includes(bar.id));
  const getBadge = () => {
    if (completedBars.length >= crawl.bars.length) {
      return <div className="p-3 m-3 text-5xl bg-red-400 rounded text-black">Megagigachad</div>;
    } else if (completedBars.length >= crawl.bars.length * 0.75) {
      return <div className="p-3 m-3 text-5xl bg-green-400 rounded text-black">Tripla</div>;
    } else if (completedBars.length >= crawl.bars.length * 0.5) {
      return <div className="p-3 m-3 text-5xl bg-yellow-400 rounded text-black">Tupla</div>;
    } else {
      return null;
    }
  };
  const badge = getBadge();


  return (
    <div className="flex flex-col items-center justify-center bg-white h-screen w-screen">
      <div className="text-4xl font-semibold mb-4">Congratulations!</div>
      <div className="text-3xl font-semibold mb-4">You completed the {crawl.name}</div>
      <div className="text-2xl font-semibold mb-8">You visited {completedBars.length} out of {crawl.bars.length} bars</div>

      <div className="text-xl mb-4">Here are the bars you visited:</div>
      <ul>
        {completedBars.map((bar: any) => (
          <li key={bar.id}>{bar.name}</li>
        ))}
      </ul>
      { badge
        ? <>
          <div className="text-xl mb-4">You complete the title of:</div>
          {badge}
        </>
        : null
      }
      <button
        className="p-2 m-2 bg-blue-500 rounded text-white"
        onClick={() => {
          // share on Telegram
          window.location.href = !badge
           ? `https://t.me/share/url?url=https://approbatur.app/report?&text=I%20completed%20the%20${crawl.name}%20and%20visited%20${completedBars.length}%20bars!%20🍻`
           : `https://t.me/share/url?url=https://approbatur.app/report?&text=I%20completed%20the%20${crawl.name}%20and%20visited%20${completedBars.length}%20bars!%20🍻%20I%20also%20got%20the%20${badge.props.children}%20badge!%20🏅`
        }}
      >
        Share on Telegram
      </button>

      <button
        className="p-2 m-2 bg-blue-500 rounded text-white"
        onClick={() => {
          // reset the visitedBars state and navigate back to the map view
          localStorage.removeItem('visitedBars');
          window.location.href = "/map";
        }}
      >
        Start New Crawl
      </button>
    </div>
  );
});

