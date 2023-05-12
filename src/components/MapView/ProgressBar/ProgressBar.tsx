import { memo } from 'react';
import type { FC } from 'react';

import classes from './ProgressBar.module.css';

interface Props {
  className?: string;
  totalBars: number;
  visitedBars: number;
}

export const ProgressBar: FC<Props> = memo(function ProgressBar({ className, totalBars, visitedBars }) {
  const progress = (visitedBars / totalBars) * 100;

  return (
    <div className={`${classes.root} ${className}`}>
      <div className={classes.rectangle4}>
        <div className={classes.rectangle3} style={{ right: `${100 - progress}%` }}></div>
      </div>
    </div>
  );
});
