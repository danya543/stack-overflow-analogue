import { useEffect, useState } from 'react';

import { getUsers, userProps } from '@/api/getUsers';

export const UsersPage = () => {
  const [data, setData] = useState<userProps[]>([]);
  useEffect(() => {
    getUsers({})
      .then((data) => {
        setData(data.data.data);
        console.log('ok');
      })
      .catch(() => console.log('fail'));
  }, []);

  return (
    <div>
      Main
      {data.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
};
