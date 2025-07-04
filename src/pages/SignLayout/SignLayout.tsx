import { Outlet } from 'react-router-dom';

import * as styles from './SignLayout.module.scss';

export const SignLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};
