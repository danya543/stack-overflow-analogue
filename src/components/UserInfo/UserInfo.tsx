import { LogOut, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteItem } from '@/api/delItem';
import { logoutUser } from '@/api/logout';
import { UserWithStatistic } from '@/api/types';
import { Alert } from '@/ui/Alert/Alert';
import { getUser, IMAGES, localLogoutUser, statsMap } from '@/ui/constants';

import * as styles from './UserInfo.module.scss';

export const UserInfo = ({ data }: { data: UserWithStatistic }) => {
  const [showAlert, setshowAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getUser('auth')) navigate('/');
  }, []);

  const handleLogout = () => {
    logoutUser();
    localLogoutUser();
    setshowAlert(true);
    navigate('/');
  };
  const handleDelAccount = () => {
    deleteItem('account');
    localLogoutUser();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {showAlert && <Alert type={'success'} message={'Logged out success'} />}
      <h1>Welcome {data.username}!</h1>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <img src={IMAGES.User} alt="" />
          <h3>{data.username}</h3>
          <p>id: {data.id}</p>
          <p>role: {data.role}</p>
          <div className={styles.manageBtns}>
            <button onClick={handleLogout}>
              <LogOut />
            </button>
            <button onClick={handleDelAccount}>
              <Trash2 />
            </button>
          </div>
        </div>
        <div className={styles.stats}>
          {statsMap.map(({ key, label }) => (
            <div key={key} className={styles.statItem}>
              <span className={styles.label}>{label}:</span>
              <span className={styles.value}>
                {data.statistic[key as keyof typeof data.statistic].toFixed(0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
