import { useEffect, useState } from 'react';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { ChangeName } from '@/components/ChangeName/ChangeName';
import { ChangePassword } from '@/components/ChangePassword/ChangePassword';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/ui/Button';
import { statsMap } from '@/ui/constants';

import * as styles from './Account.module.scss';

export const AccountPage = () => {
  const [data, setData] = useState<UserWithStatistic | null>(null);
  const id = JSON.parse(sessionStorage.getItem('user_id'));
  useEffect(() => {
    getUserInfo({ id })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {data ? (
        <>
          <h1>Welcome {data.username}!</h1>
          <div className={styles.info}>
            <div>
              <h3>{data.username}</h3>
              <p>{data.id}</p>
              <p>{data.role}</p>
              <Button text="out" />
              <Button text="del" />
            </div>
            <div className={styles.statsGrid}>
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
          <ChangeName currentName={data.username} />
          <ChangePassword />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
