import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Button.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  text?: {
    start?: ReactNode;
  };
}
/* @figmaId 2:59 */
export const Button: FC<Props> = memo(function Button(props = {}) {
  return (
    <button className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.rectangle2}></div>
      {props.text?.start != null ? props.text?.start : <div className={classes.start}>start</div>}
    </button>
  );
});
