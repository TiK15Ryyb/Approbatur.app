import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Button.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 2:59 */
export const Button: FC<Props> = memo(function Button(props = {}) {
  return (
    <a href='./map'>
      <button 
        className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
        <div className={classes.rectangle2}></div>
        <div className={classes.start}>start</div>
      </button>
    </a>
  );
});
