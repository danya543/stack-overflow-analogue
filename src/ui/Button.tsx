import { ButtonHTMLAttributes } from 'react';

import * as styles from './UI.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: string;
  onClick?: () => void;
}

export const Button = ({ text, icon, onClick, ...rest }: ButtonProps) => {
  return (
    <button onClick={onClick || null} {...rest}>
      {text ? text : icon ? <img src={icon} alt="icon" className={styles.icon} /> : null}
    </button>
  );
};
