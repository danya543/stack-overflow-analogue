import { logoutUser } from '@/api/logout';
import { Button } from '@/ui/Button';

import { Logo } from '../Logo/Logo';
import * as styles from './Header.module.scss';

export const Header = () => {
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <header className={styles.header}>
      <Logo />
      <Button onClick={handleLogout} text={'Logout'} />
    </header>
  );
};
