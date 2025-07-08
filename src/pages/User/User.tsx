import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/ui/Button';

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<UserWithStatistic | null>(null);

  useEffect(() => {
    getUserInfo({ id })
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const labels: Record<string, string> = {
    snippetsCount: 'Snippets',
    rating: 'Rating',
    commentsCount: 'Comments',
    likesCount: 'Likes',
    dislikesCount: 'Dislikes',
    questionsCount: 'Questions',
    correctAnswersCount: 'Correct Answers',
    regularAnswersCount: 'Regular Answers',
  };

  return (
    <section>
      {data ? (
        <div>
          <Button onClick={() => window.history.back()} text="back" />
          <h3>{data.username}</h3>
          <p>{data.role}</p>
          <ul>
            {Object.entries(data.statistic).map(([key, value]) => (
              <li key={key}>
                {labels[key] || key}: {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};
