import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './BarView.module.css';
import { Button } from './Button/Button';

interface Props {
  className?: string;
}
/* @figmaId 1:51 */
export const BarView: FC<Props> = memo(function BarView(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.exampleBar}>Example bar</div>
      <div className={classes.exampleBar2}>Example bar</div>
      <div className={classes.address}>Address</div>
      <div className={classes.open00180}>Open: 00:00 - 18:00</div>
      <a href='/map-progressed'>
        <Button
          className={classes.button}
          text={{
            start: <div className={classes.start}>Mark done</div>,
          }}
        />
      </a>
      <a href='/map'>
        <Button
          className={classes.button2}
          text={{
            start: <div className={classes.start2}>Back</div>,
          }}
        />
      </a>
    </div>
  );
});
