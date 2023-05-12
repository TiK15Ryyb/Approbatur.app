import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Button } from './Button/Button';
import classes from './ReportScreen.module.css';

interface Props {
  className?: string;
}
/* @figmaId 2:121 */
export const ReportScreen: FC<Props> = memo(function ReportScreen(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.youDidIt}>
        <div className={classes.textBlock}>You did it</div>
        <div className={classes.textBlock2}>
          <p></p>
        </div>
      </div>
      <div className={classes.youCompleted}>You completed</div>
      <div className={classes._45Bars}>4/5 Bars</div>
      <a href='/map-progressed'>
      <Button
        className={classes.button}
        text={{
          start: <div className={classes.start}>View map</div>,
        }}
      />
      </a>
    </div>
  );
});
