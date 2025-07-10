import { useEffect, useState } from 'react';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { PasswordInput } from '@/ui/PasswordInput';

import * as styles from './Account.module.scss';
const statsMap = [
  { key: 'snippetsCount', label: 'Snippets' },
  { key: 'rating', label: 'Rating' },
  { key: 'commentsCount', label: 'Comments' },
  { key: 'likesCount', label: 'Likes' },
  { key: 'dislikesCount', label: 'Dislikes' },
  { key: 'questionsCount', label: 'Questions' },
  { key: 'correctAnswersCount', label: 'Correct Answers' },
  { key: 'regularAnswersCount', label: 'Answers' },
];

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
                    {data.statistic[key as keyof typeof data.statistic]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.accountBlock}>
            <Input placeholder={'New username'} />
            <Button text="Save" />
          </div>
          <div className={styles.accountBlock}>
            <PasswordInput placeholder="Old password" />
            <PasswordInput placeholder="New password" />
            <PasswordInput placeholder="Confirm password" />
            <Button text="Change password" />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
