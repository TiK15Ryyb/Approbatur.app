import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import classes from './CompletedProgressBar.module.css';
import { Rectangle3Icon } from './Rectangle3Icon';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  hide?: {
    rectangle3?: boolean;
  };
}
/* @figmaId 2:75 */
export const CompletedProgressBar: FC<Props> = memo(function CompletedProgressBar(props = {}) {
  return (
    <button className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <ProgressBar
        className={classes.progressBar}
        hide={{
          rectangle3: true,
        }}
      />
      <div className={classes.rectangle3}>
        <Rectangle3Icon className={classes.icon} />
      </div>
      <div className={classes.complete}>Complete</div>
    </button>
  );
});
