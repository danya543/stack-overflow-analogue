import { useEffect, useState } from 'react';

import { getQuestions } from '@/api/getQuestions';
import { Question } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';

import * as styles from './Questions.module.scss';

export const QuestionsPage = () => {
  const [data, setData] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async (page: number) => {
    setLoading(true);
    try {
      const response = await getQuestions({
        page,
        limit: 10,
        sortBy: 'title:DESC',
      });
      setData(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className={styles.container}>
      {loading && <Loader />}

      {!loading && data.length === 0 && <p className={styles.noQuestions}>No questions found.</p>}

      {!loading && data.length > 0 && (
        <>
          {data.map((item) => (
            <QuestionCard key={item.id} data={item} />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};
