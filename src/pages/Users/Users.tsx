import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUsers } from '@/api/getUsers';
import { UserBase } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';

import * as styles from './Users.module.scss';

export const UsersPage = () => {
  const [data, setData] = useState<UserBase[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers({})
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.container}>
      {data ? (
        data.map((user) => (
          <div key={user.id} onClick={() => navigate(`${user.id}`)} className={styles.user}>
            <p>Name: {user.username},</p>
            <p>Role: {user.role}</p>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </section>
  );
};
