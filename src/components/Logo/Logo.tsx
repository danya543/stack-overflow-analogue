import { IMAGES } from '@/ui/constants';

import * as styles from './Logo.module.scss';

export const Logo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.logo} onClick={onClick}>
      <img src={IMAGES.Logo} />
      <h1>codelang</h1>
    </div>
  );
};
