import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthUser } from '@/api/auth';
import { logoutUser } from '@/api/logout';
import { Button } from '@/ui/Button';

import { Logo } from '../Logo/Logo';
import * as styles from './Header.module.scss';

export const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleLog = () => {
    if (isLogged) logoutUser();
    navigate('/sign/login');
  };

  useEffect(() => {
    getAuthUser()
      .then(() => setIsLogged(true))
      .catch(() => setIsLogged(false));
  }, []);

  return (
    <header className={styles.header}>
      <Logo onClick={() => navigate('/')} />
      <Button onClick={handleLog} text={isLogged ? 'Logout' : 'Login'} />
    </header>
  );
};
