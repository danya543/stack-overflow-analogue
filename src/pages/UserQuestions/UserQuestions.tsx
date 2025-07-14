import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MAX_TOTAL_ITEMS } from '@/api/constants';
import { getQuestions } from '@/api/getQuestions';
import { Question } from '@/api/types';
import { Error } from '@/components/Error/Error';
import { Loader } from '@/components/Loader/Loader';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { getUser } from '@/ui/constants';

export const UserQuestionsPage = () => {
  const [data, setData] = useState<Question[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(MAX_TOTAL_ITEMS);
  const navigate = useNavigate();

  const userId = getUser('id');

  useEffect(() => {
    if (getUser('auth')) {
      const fetchSnippets = async (limit: number) => {
        try {
          const response = await getQuestions({ limit });
          const total = response.data.meta.totalItems;

          if (total > limit) {
            setTotalItems(total);
            const retryResponse = await getQuestions({ limit: total });
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
    } else {
      navigate('/sign/login');
    }
  }, []);

  return (
    <div>
      <h1>Your questions!</h1>

      {errorMsg ? (
        <Error
          message={errorMsg}
          retry={() => {
            setErrorMsg('');
          }}
        />
      ) : data ? (
        data.length === 0 ? (
          <p>You haven&apos;t asked any questions yet.</p>
        ) : (
          <>
            {data.map((item) => (
              <QuestionCard key={item.id} data={item} userId={userId} />
            ))}
          </>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};
