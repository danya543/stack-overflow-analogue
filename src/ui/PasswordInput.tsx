import { useState } from 'react';
import { InputHTMLAttributes } from 'react';

import { Button } from './Button';
import { ICONS } from './constants';
import * as styles from './UI.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

export const PasswordInput = ({ classname, ...rest }: InputProps) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={styles.inputBlock}>
      <input
        {...rest}
        type={visible ? 'text' : 'password'}
        className={`${styles.input} ${classname}`}
      />
      <Button
        onClick={toggleVisibility}
        className={styles.iconButton}
        type="button"
        icon={visible ? ICONS.View : ICONS.Hide}
      />
    </div>
  );
};
