import { AlertTriangle } from 'lucide-react';

import * as styles from './Error.module.scss';

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

export const Error = ({ message = 'Something went wrong', retry }: ErrorMessageProps) => {
  return (
    <div className={styles.error}>
      <AlertTriangle size={32} color="#f44336" />
      <p>{message}</p>
      {retry && (
        <button onClick={retry} className={styles.retryBtn}>
          Reload
        </button>
      )}
    </div>
  );
};
