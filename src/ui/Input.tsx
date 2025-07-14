import { InputHTMLAttributes } from 'react';

import * as styles from './UI.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

export const Input = (props: InputProps) => {
  return <input {...props} className={`${styles.input} ${props.classname}`} />;
};
