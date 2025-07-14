import { Edit, SquarePlus, Trash } from 'lucide-react';

import { Question } from '@/api/types';
import { useQuestionCard } from '@/hooks/useQuestionCard';
import { Alert } from '@/ui/Alert/Alert';

import * as styles from './QuestionCard.module.scss';

export const QuestionCard = ({ data, userId }: { data: Question; userId: string }) => {
  const {
    isDeleted,
    alertInfo,
    showInput,
    newAnswer,
    answers,
    setShowInput,
    setNewAnswer,
    handleEditClick,
    handleDeleteClick,
    handleAddAnswer,
  } = useQuestionCard(data, userId);

  if (isDeleted) return null;

  return (
    <div className={styles.container}>
      {alertInfo && <Alert type={alertInfo.type} message={alertInfo.message} />}

      <div className={styles.header}>
        <h3>{data.title}</h3>
        <div className={styles.buttons}>
          {userId === data.user.id && (
            <div>
              <button onClick={handleEditClick}>
                <Edit />
              </button>
              <button onClick={handleDeleteClick}>
                <Trash />
              </button>
            </div>
          )}
          <button onClick={() => setShowInput((prev) => !prev)}>
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

      {showInput && (
        <div className={styles.answerInput}>
          <textarea
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddAnswer}>Submit Answer</button>
        </div>
      )}

      <h3>Answers</h3>
      <div className={styles.answers}>
        {answers.length > 0 ? (
          answers.map((item) => (
            <div key={item.id} className={styles.answerItem}>
              <p className={styles.answer}>
                {item.content} {item.isCorrect && <span className={styles.correct}>✔</span>}
              </p>
            </div>
          ))
        ) : (
          <p>No answers yet(</p>
        )}
      </div>
    </div>
  );
};
