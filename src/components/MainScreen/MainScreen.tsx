import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Button } from './Button/Button';
import classes from './MainScreen.module.css';

interface Props {
  className?: string;
}
/* @figmaId 1:2 */
export const MainScreen: FC<Props> = memo(function MainScreen(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.approOfYouLifetime}>Appro of you lifetime</div>
      <Button className={classes.button} />
    </div>
  );
});
