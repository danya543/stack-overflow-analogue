import { useEffect, useState } from 'react';

import { getSnippets, snippetProps } from '@/api/getSnippets';
import { Snippet } from '@/components/Snippet/Snippet';

export const MainPage = () => {
  const [data, setData] = useState<snippetProps[] | null>(null);
  useEffect(() => {
    getSnippets({})
      .then((data) => setData(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome to codelang!</h1>
      {data ? data.map((item) => <Snippet data={item} key={item.id} />) : 'Loading'}
    </div>
  );
};
