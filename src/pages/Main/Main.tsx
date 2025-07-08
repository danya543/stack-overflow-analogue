import { useEffect, useState } from 'react';

import { getSnippets } from '@/api/getSnippets';
import { SnippetProps } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { SnippetCard } from '@/components/Snippet/Snippet';

export const MainPage = () => {
  const [data, setData] = useState<SnippetProps[] | null>(null);
  useEffect(() => {
    getSnippets({})
      .then((data) => setData(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome to codelang!</h1>
      {data ? data.map((item) => <SnippetCard data={item} key={item.id} />) : <Loader />}
    </div>
  );
};
