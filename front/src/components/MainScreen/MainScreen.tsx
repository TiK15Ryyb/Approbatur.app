import { memo } from 'react';
import type { FC } from 'react';

import { Button } from './Button/Button';

interface Props {
  className?: string;
  crawls: any[];
}
export const MainScreen: FC<Props> = memo(function MainScreen(props = { crawls: []}) {
  const { crawls } = props;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white overflow-hidden">
      <div className="text-3xl font-semibold text-center mb-10">Appro of your lifetime</div>
        {crawls.length
        ? crawls.map((crawl) => (
          <>
            <h2 key={`crawl-${crawl.id}`} className="text-2xl font-semibold mb-4">{crawl.name}</h2>
            { crawl.bars.map((bar: any) => (
              <div key={`bar-${bar.id}`} className="p-4 bg-gray-200 rounded-md mb-4 w-4/5">
                <div className="text-xl font-semibold mb-2">{bar.name}</div>
                <div className="flex justify-between">
                  <span>{bar.address}</span>
                  <span>{bar.distance}</span>
                </div>
              </div>
            ))}
            <Button crawlId={crawl.id} className="bg-blue-500 text-white rounded-md p-2 mt-4 absolute bottom-10" />
          </>
        ))
        : <div className="text-2xl font-semibold mb-4">No crawls found</div>
      }
    </div>
  );
});