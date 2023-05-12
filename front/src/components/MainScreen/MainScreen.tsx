import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Button } from './Button/Button';
import classes from './MainScreen.module.css';

import { BarCrawlData } from '@/data/BarCrawlData';

interface Props {
  className?: string;
}
export const MainScreen: FC<Props> = memo(function MainScreen(props = {}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
      <div className="text-3xl font-semibold text-center mb-10">Appro of your lifetime</div>
      {BarCrawlData.map((bar) => (
        <div key={bar.id} className="p-4 bg-gray-200 rounded-md mb-4 w-4/5">
          <div className="text-xl font-semibold mb-2">{bar.name}</div>
          <div className="flex justify-between">
            <span>{bar.address}</span>
            <span>{bar.distance}</span>
          </div>
        </div>
      ))}
      <Button className="bg-blue-500 text-white rounded-md p-2 mt-4 absolute bottom-10" />
    </div>
  );
});
