import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LazyAbout } from '@/pages/about/About.lazy';
import { Shop } from '@/pages/shop';

import { App } from '../App';
import { SignLayout } from '@/pages/SignLayout/SignLayout';
import { LoginPage } from '@/pages/Login/Login';
import { RegisterPage } from '@/pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
