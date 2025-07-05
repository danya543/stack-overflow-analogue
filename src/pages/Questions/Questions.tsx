import { useEffect, useState } from 'react';

import { getQuestions } from '@/api/getQuestions';
import { Question } from '@/api/types';

export const QuestionsPage = () => {
  const [data, setData] = useState<Question[] | null>(null);
  useEffect(() => {
    getQuestions({})
      .then((data) => setData(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>{data ? data.map((item) => <p key={item.id}>{item.title}</p>) : 'Loading'}</section>
  );
};
