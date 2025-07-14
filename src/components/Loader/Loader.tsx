import React from 'react';

import * as styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
