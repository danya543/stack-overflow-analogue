import { ReactNode } from 'react';

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/*  ThemeProvider, AuthProvider... */}
      {children}
    </>
  );
};
