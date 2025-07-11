import { useEffect, useState } from 'react';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { ChangeName } from '@/components/ChangeName/ChangeName';
import { ChangePassword } from '@/components/ChangePassword/ChangePassword';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { getUser } from '@/ui/constants';

import * as styles from './Account.module.scss';

export const AccountPage = () => {
  const [data, setData] = useState<UserWithStatistic | null>(null);
  const id = getUser('id');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    getUserInfo({ id })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        console.error(err);
      });
  }, []);

  return (
    <section className={styles.container}>
      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setErrorMsg('');
          }}
        />
      ) : data ? (
        <>
          <UserInfo data={data} />
          <div className={styles.manage_account}>
            <ChangeName currentName={data.username} />
            <ChangePassword />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
