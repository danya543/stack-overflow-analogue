import { Question } from '@/api/types';

import * as styles from './QuestionCard.module.scss';

export const QuestionCard = ({ data }: { data: Question }) => {
  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
      <p className={styles.userInfo}>
        asked by <strong>{data.user.role}</strong>: {data.user.username}
      </p>

      <p className={styles.description}>{data.description}</p>

      {data.attachedCode && (
        <pre className={styles.codeBlock}>
          <code>{data.attachedCode}</code>
        </pre>
      )}

      <h3>Answers</h3>
      <div className={styles.answers}>
        {data.answers.map((item) => (
          <p key={item.id} className={styles.answer}>
            {item.content} {item.isCorrect && <span className={styles.correct}>✔</span>}
          </p>
        ))}
      </div>
    </div>
  );
};
