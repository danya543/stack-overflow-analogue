import { Question } from '@/api/types';

import * as styles from './QuestionCard.module.scss';

export const QuestionCard = ({ data }: { data: Question }) => {
  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
      asked by {data.user.role}: {data.user.username}
      {data.isResolved}
      <p>{data.description}</p>
      <button>eye</button>
      {data.attachedCode}
      {data.answers.map((item) => (
        <p key={item.id}>
          {item.content} {item.isCorrect}
        </p>
      ))}
    </div>
  );
};
