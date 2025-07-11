import { useEffect, useState } from 'react';

import { getSnippets } from '@/api/getSnippets';
import { Meta, SnippetProps } from '@/api/types';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { SnippetCard } from '@/components/Snippet/SnippetCard';
import { getUser, SESSION_KEYS } from '@/ui/constants';

export const MainPage = () => {
  const [data, setData] = useState<SnippetProps[] | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = getUser('id');

  const fetchData = async () => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const response = await getSnippets({ page });
      setData(response.data.data);
      sessionStorage.setItem(
        SESSION_KEYS.TotalItems,
        JSON.stringify(response.data.meta.totalItems),
      );
      setMeta(response.data.meta);
      setErrorMsg('');
    } catch (err) {
      setData(null);
      setErrorMsg(err.message || 'Failed to load');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1>Welcome to codelang!</h1>

      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setPage(1);
            setErrorMsg('');
          }}
        />
      ) : loading ? (
        <Loader />
      ) : data ? (
        <>
          {data.map((item) => (
            <SnippetCard key={item.id} data={item} userId={userId} type="main" />
          ))}
          {meta && (
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
