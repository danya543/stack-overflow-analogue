import { useEffect, useState } from 'react';

import { getQuestions } from '@/api/getQuestions';
import { Question } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';

export const QuestionsPage = () => {
  const [data, setData] = useState<Question[] | null>(null);
  useEffect(() => {
    getQuestions({})
      .then((data) => setData(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      {data ? data.map((item) => <QuestionCard key={item.id} data={item} />) : <Loader />}
    </section>
  );
};
