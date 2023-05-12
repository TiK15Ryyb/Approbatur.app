import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { CompletedProgressBar } from './CompletedProgressBar/CompletedProgressBar';
import classes from './MapViewProgress.module.css';
import { Marker } from '../Marker/Marker';
import { ProgressBar } from './ProgressBar/ProgressBar';

interface Props {
  className?: string;
  hide?: {
    rectangle4?: boolean;
    rectangle3?: boolean;
    rectangle32?: boolean;
  };
}
/* @figmaId 2:132 */
export const MapViewProgress: FC<Props> = memo(function MapViewProgress(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.iPhone141}>
        <div className={classes.screenshot2023511At23441}></div>
        <Marker className={classes.marker} />
        <Marker className={classes.marker2} />
        <Marker className={classes.marker3} />
        <Marker className={classes.marker4} />
        <Marker className={classes.marker5} />
        <Marker className={classes.marker6} />
        <a href='/report'>
          <ProgressBar
            className={classes.progressBar}
            hide={{
              rectangle4: true,
              rectangle3: true,
            }}
          />
        <CompletedProgressBar className={classes.completedProgressBar} />
        </a>
      </div>
    </div>
  );
});
