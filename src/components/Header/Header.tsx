import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/logout';
import { Button } from '@/ui/Button';

import { Logo } from '../Logo/Logo';
import * as styles from './Header.module.scss';

export const Header = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  );
  const navigate = useNavigate();

  const handleLog = () => {
    if (isLogged) {
      logoutUser();
      localStorage.setItem('isAuthenticated', 'false');
      setIsLogged(false);
    } else {
      navigate('/sign/login');
    }
  };

  return (
    <header className={styles.header}>
      <Logo onClick={() => navigate('/')} />
      <Button onClick={handleLog} text={isLogged ? 'Logout' : 'Login'} />
    </header>
  );
};
