import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header';
import { SideMenu } from '@/components/SideMenu/SideMenu';

import * as styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <section className={styles.container}>
      <Header />
      <SideMenu />
      <Outlet />
    </section>
  );
};
