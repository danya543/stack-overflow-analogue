import { Link } from 'react-router-dom';

import { Button } from '@/ui/Button';

import * as styles from './SideMenu.module.scss';

export const SideMenu = () => {
  const handleOpenMenu = () => {
    console.log('first');
  };

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <Button onClick={handleOpenMenu}>Profile</Button>
        <Link to={'/'}>Home</Link>
        <Link to={'/account'}>My account</Link>
        <Link to={'/about'}>Post snippet</Link>
        <Link to={'/about'}>My snippets</Link>
        <Link to={'/questions'}>Questions</Link>
        <Link to={'/users'}>Users</Link>
      </ul>
    </div>
  );
};
