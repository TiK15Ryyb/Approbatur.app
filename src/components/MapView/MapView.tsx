import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './MapView.module.css';
import { Marker } from '../Marker/Marker';
import { ProgressBar } from './ProgressBar/ProgressBar';

interface Props {
  className?: string;
}
/* @figmaId 2:131 */
export const MapView: FC<Props> = memo(function MapView(props = {}) {
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
        <ProgressBar className={classes.progressBar} />
      </div>
    </div>
  );
});
