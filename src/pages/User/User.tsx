import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getUserInfo } from '@/api/getUserInfo';
import { UserWithStatistic } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';

import * as styles from './User.module.scss';

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
    <section className={styles.container}>
      {data ? (
        <div>
          <button onClick={() => window.history.back()}>
            <ChevronLeft />
          </button>
          <h3>{data.username}</h3>
          <p>{data.role}</p>
          <ul>
            {Object.entries(data.statistic).map(([key, value]) => (
              <li key={key}>
                {labels[key] || key}:{' '}
                {key === 'rating' && typeof value === 'number' ? value.toFixed(2) : value}
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
