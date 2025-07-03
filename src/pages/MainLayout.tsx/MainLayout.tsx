import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header';
import { SideMenu } from '@/components/SideMenu/SideMenu';

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <SideMenu />
      <Outlet />
    </div>
  );
};
