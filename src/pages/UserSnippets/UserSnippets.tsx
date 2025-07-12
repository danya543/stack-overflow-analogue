import { useEffect, useState } from 'react';

import { MAX_TOTAL_ITEMS } from '@/api/constants';
import { getSnippets } from '@/api/getSnippets';
import { SnippetProps } from '@/api/types';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { SnippetCard } from '@/components/SnippetCard/SnippetCard';
import { getUser } from '@/ui/constants';

export const UserSnippetsPage = () => {
  const [data, setData] = useState<SnippetProps[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(MAX_TOTAL_ITEMS);

  const userId = getUser('id');

  useEffect(() => {
    const fetchSnippets = async (limit: number) => {
      try {
        const response = await getSnippets({ limit });
        const total = response.data.meta.totalItems;

        if (total > limit) {
          setTotalItems(total);
          const retryResponse = await getSnippets({ limit: total });
          const filtered = retryResponse.data.data.filter((el) => el.user.id === userId);
          setData(filtered);
        } else {
          const filtered = response.data.data.filter((el) => el.user.id === userId);
          setData(filtered);
        }

        setErrorMsg('');
      } catch (err) {
        setData(null);
        setErrorMsg(err.message || 'Failed to load');
        console.error(err);
      }
    };

    fetchSnippets(totalItems);
  }, []);

  return (
    <div>
      <h1>Your snippets!</h1>

      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setErrorMsg('');
          }}
        />
      ) : data ? (
        <>
          {data.map((item) => (
            <SnippetCard key={item.id} data={item} userId={userId} type="mine" />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
