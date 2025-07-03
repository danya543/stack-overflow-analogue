import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LazyAbout } from '@/pages/about/About.lazy';
import { LoginPage } from '@/pages/Login/Login';
import { MainLayout } from '@/pages/MainLayout.tsx/MainLayout';
import { RegisterPage } from '@/pages/Register/Register';
import { Shop } from '@/pages/shop';
import { SignLayout } from '@/pages/SignLayout/SignLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'Loading...'}>
            <Shop />
          </Suspense>
        ),
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
