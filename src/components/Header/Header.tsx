import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '@/api/logout';
import { Alert } from '@/ui/Alert/Alert';
import { Button } from '@/ui/Button';
import { getUser, SESSION_KEYS } from '@/ui/constants';

import { Logo } from '../Logo/Logo';
import * as styles from './Header.module.scss';

export const Header = () => {
  const [isLogged, setIsLogged] = useState(getUser('auth'));
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLog = () => {
    if (isLogged) {
      logoutUser();
      sessionStorage.setItem(SESSION_KEYS.Auth, 'false');
      setIsLogged(false);
      setShowAlert(true);
    } else {
      navigate('/sign/login');
    }
  };

  return (
    <header className={styles.header}>
      {showAlert && <Alert message={'Logged out success'} type={'success'} />}
      <Logo onClick={() => navigate('/')} />
      <Button onClick={handleLog} text={isLogged ? 'Logout' : 'Login'} />
    </header>
  );
};
