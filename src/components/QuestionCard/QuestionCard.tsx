import { Edit, SquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Question } from '@/api/types';

import * as styles from './QuestionCard.module.scss';

export const QuestionCard = ({ data, type = 'all' }: { data: Question; type?: 'mine' | 'all' }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/questions/edit/${data.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{data.title}</h3>
        <div>
          {type === 'mine' && (
            <button onClick={handleEditClick}>
              <Edit />
            </button>
          )}
          <button onClick={() => console.log('add answer')}>
            <SquarePlus />
          </button>
        </div>
      </div>
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
        {data.answers.length > 0 ? (
          data.answers.map((item) => (
            <p key={item.id} className={styles.answer}>
              {item.content} {item.isCorrect && <span className={styles.correct}>✔</span>}
            </p>
          ))
        ) : (
          <p>No answers yet(</p>
        )}
      </div>
    </div>
  );
};
