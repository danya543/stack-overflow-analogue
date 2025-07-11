import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { ChangeName } from '@/components/ChangeName/ChangeName';
import { ChangePassword } from '@/components/ChangePassword/ChangePassword';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { Alert } from '@/ui/Alert/Alert';
import { getUser } from '@/ui/constants';

import * as styles from './Account.module.scss';

export const AccountPage = () => {
  const [data, setData] = useState<UserWithStatistic | null>(null);
  const [reload, setReload] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const id = getUser('id');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUserInfo({ id })
        .then((data) => {
          setData(data.data);
        })
        .catch((err) => {
          setErrorMsg(err.message);
          console.error(err);
        });
    } else {
      setErrorMsg('You need to sign in to see this page!');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/sign/login');
      }, 3500);
    }
  }, [reload]);

  return (
    <section className={styles.container}>
      {showAlert && <Alert type="info" message={'You will be redirect to login page...'} />}
      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setErrorMsg('');
            setReload((prev) => ++prev);
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
