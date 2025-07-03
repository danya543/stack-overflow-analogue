import { ReactNode } from 'react';

interface AppProps {
  children: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return (
    <>
      {/* Тут могут быть общие контексты, например ThemeProvider, AuthProvider и т.д. */}
      {children}
    </>
  );
};
