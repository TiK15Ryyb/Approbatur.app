'use client'

import { memo } from 'react';
import type { FC } from 'react';
import { BarCrawlData } from '@/data/BarCrawlData';

interface Props {
  className?: string;
}

export const ReportScreen: FC<Props> = memo(function ReportScreen({ className }) {
  const visitedBars = 1

  return (
    <div className="flex flex-col items-center justify-center bg-white h-screen w-screen">
      <div className="text-4xl font-semibold mb-4">You did it!</div>
      <div className="text-4xl font-semibold mb-8">You completed {visitedBars} Bars</div>
      <button
        className="p-2 m-2 bg-blue-500 rounded text-white"
        onClick={() => {
          // share on Telegram
          window.location.href = "https://t.me/share/url?url=https://barcrawl.app&text=I%20completed%20the%20Bar%20Crawl%20App%20and%20visited%20" + visitedBars + "%20Bars%20in%20Berlin%20🍻"
        }}
      >
        Share on Telegram
      </button>
      <button
        className="p-2 m-2 bg-blue-500 rounded text-white"
        onClick={() => {
          // reset the visitedBars state and navigate back to the map view
          window.location.href = "/map"
        }}
      >
        Start New Appro
      </button>
    </div>
  );
});
