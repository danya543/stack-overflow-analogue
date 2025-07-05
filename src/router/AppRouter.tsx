import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AccountPage } from '@/pages/Account/Account';
import { LoginPage } from '@/pages/Authorized/Login';
import { RegisterPage } from '@/pages/Authorized/Register';
import { MainPage } from '@/pages/Main/Main';
import { MainLayout } from '@/pages/MainLayout.tsx/MainLayout';
import { SignLayout } from '@/pages/SignLayout/SignLayout';
import { UserPage } from '@/pages/User/User';
import { UsersPage } from '@/pages/Users/Users';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserPage />,
      },
      {
        path: '/account',
        element: <AccountPage />,
      },
    ],
  },
  {
    path: '/sign',
    element: <SignLayout />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={'Loading...'}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={'Loading...'}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
]);
