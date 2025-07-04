import { useNavigate } from 'react-router-dom';

import { IMAGES } from '@/ui/constants';

import * as styles from './Logo.module.scss';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.logo} onClick={() => navigate('/')}>
      <img src={IMAGES.Logo} />
      <h1>codelang</h1>
    </div>
  );
};
