import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import * as styles from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);
  const handleCount = () => setCount(prev => ++prev);

  return (
    <div>
      <Link to={'/about'}>about</Link>
      <Link to={'/shop'}>shop</Link>
      <h1>{count}</h1>
      <button className={styles.btn} onClick={handleCount}>
        count
      </button>
      <Outlet />
    </div>
  );
};
