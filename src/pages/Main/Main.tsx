import { useEffect, useState } from 'react';

import { getSnippets } from '@/api/getSnippets';
import { SnippetProps } from '@/api/types';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { SnippetCard } from '@/components/Snippet/SnippetCard';
import { getUser } from '@/ui/constants';

export const MainPage = () => {
  const [data, setData] = useState<SnippetProps[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [reload, setReload] = useState(0);
  const userId = getUser('id');

  useEffect(() => {
    getSnippets({})
      .then((data) => {
        setErrorMsg('');
        setData(data.data.data);
      })
      .catch((err) => {
        setData(null);
        setErrorMsg(err.message);
        console.error(err);
      });
  }, [reload]);

  return (
    <div>
      <h1>Welcome to codelang!</h1>
      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setReload(reload + 1);
            setErrorMsg('');
          }}
        />
      ) : data ? (
        data.map((item) => <SnippetCard data={item} userId={userId} key={item.id} type={'main'} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};
