import { FileText, HelpCircle, Home, PlusCircle, User, Users } from 'lucide-react';
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

        <li>
          <Link to="/" className={styles.link}>
            <Home className={styles.icon} />
            Home
          </Link>
        </li>

        <li>
          <Link to="/account" className={styles.link}>
            <User className={styles.icon} />
            My account
          </Link>
        </li>

        <li>
          <Link to="/create-snippet" className={styles.link}>
            <PlusCircle className={styles.icon} />
            Post snippet
          </Link>
        </li>

        <li>
          <Link to="/about" className={styles.link}>
            <FileText className={styles.icon} />
            My snippets
          </Link>
        </li>

        <li>
          <Link to="/questions" className={styles.link}>
            <HelpCircle className={styles.icon} />
            Questions
          </Link>
        </li>

        <li>
          <Link to="/users" className={styles.link}>
            <Users className={styles.icon} />
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};
