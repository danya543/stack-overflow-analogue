import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import { AccountPage } from '@/pages/Account/Account';
import { LoginPage } from '@/pages/Authorized/Login';
import { RegisterPage } from '@/pages/Authorized/Register';
import { CreateSnippetPage } from '@/pages/createSnippet/CreateSnippet';
import { EditSnippetPage } from '@/pages/EditSnippet/EditSnippet';
import { MainPage } from '@/pages/Main/Main';
import { MainLayout } from '@/pages/MainLayout.tsx/MainLayout';
import { PostPage } from '@/pages/Post/Post';
import { QuestionsPage } from '@/pages/Questions/Questions';
import { SignLayout } from '@/pages/SignLayout/SignLayout';
import { UserPage } from '@/pages/User/User';
import { UsersPage } from '@/pages/Users/Users';
import { UserSnippetsPage } from '@/pages/UserSnippets/UserSnippets';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: '/post/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <PostPage />
          </Suspense>
        ),
      },
      {
        path: '/snippets/new',
        element: (
          <Suspense fallback={<Loader />}>
            <CreateSnippetPage />
          </Suspense>
        ),
      },
      {
        path: '/snippets/edit/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <EditSnippetPage />
          </Suspense>
        ),
      },
      {
        path: '/snippets/my',
        element: (
          <Suspense fallback={<Loader />}>
            <UserSnippetsPage />
          </Suspense>
        ),
      },
      {
        path: '/users',
        element: (
          <Suspense fallback={<Loader />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: '/users/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: '/questions',
        element: (
          <Suspense fallback={<Loader />}>
            <QuestionsPage />
          </Suspense>
        ),
      },
      {
        path: '/account',
        element: (
          <Suspense fallback={<Loader />}>
            <AccountPage />
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
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
]);
