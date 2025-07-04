import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { LoginButton } from '@/components/A/A';
import { LoginPage } from '@/pages/Authorized/Login';
import { RegisterPage } from '@/pages/Authorized/Register';
import { MainLayout } from '@/pages/MainLayout.tsx/MainLayout';
import { SignLayout } from '@/pages/SignLayout/SignLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/a',
        element: <LoginButton />,
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
