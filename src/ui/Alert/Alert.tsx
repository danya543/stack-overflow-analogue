import { CheckCircle, Info, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import * as styles from './Alert.module.scss';

type AlertType = 'info' | 'success' | 'error';

export interface AlertProps {
  type?: AlertType;
  message: string;
  duration?: number;
}

export const Alert = ({ type = 'info', message, duration = 3000 }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  if (!visible) return null;

  const alertContent = (
    <div className={`${styles.alertWrapper}`}>
      <div className={`${styles.alert} ${styles[type]}`}>
        {getIcon()}
        <span>{message}</span>
        <div className={styles.progress} style={{ animationDuration: `${duration}ms` }} />
      </div>
    </div>
  );

  return ReactDOM.createPortal(alertContent, document.body);
};
