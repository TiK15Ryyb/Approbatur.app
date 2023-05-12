import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Frame1Icon } from './Frame1Icon';
import classes from './Marker.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 1:20 */
export const Marker: FC<Props> = memo(function Marker(props = {}) {
  return (
    <a href='/appro/test-appro/bars/test-bar'>
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.frame1}>
        <Frame1Icon className={classes.icon} />
      </div>
    </div>
    </a>
  );
});
