import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './ProgressBar.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  hide?: {
    rectangle4?: boolean;
    rectangle3?: boolean;
  };
}
/* @figmaId 2:68 */
export const ProgressBar: FC<Props> = memo(function ProgressBar(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      {!props.hide?.rectangle4 && <div className={classes.rectangle4}></div>}
      {!props.hide?.rectangle3 && <div className={classes.rectangle3}></div>}
    </div>
  );
});
