import { useEffect, useState } from 'react';

import { getQuestions, questionProps } from '@/api/getQuestions';

export const QuestionsPage = () => {
  const [data, setData] = useState<questionProps[] | null>(null);
  useEffect(() => {
    getQuestions({})
      .then((data) => setData(data.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>{data ? data.map((item) => <p key={item.id}>{item.title}</p>) : 'Loading'}</section>
  );
};
