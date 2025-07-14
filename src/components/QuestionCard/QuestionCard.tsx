import { Edit, SquarePlus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createEntity } from '@/api/creaeteEntity';
import { deleteItem } from '@/api/delItem';
import { Question } from '@/api/types';
import { Alert, AlertProps } from '@/ui/Alert/Alert';

import * as styles from './QuestionCard.module.scss';

export const QuestionCard = ({ data, userId }: { data: Question; userId: string }) => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState(data.answers);

  const handleEditClick = () => {
    navigate(`/questions/edit/${data.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteItem('question', data.id);
      setAlertInfo({
        type: 'success',
        message: 'Question successfully deleted',
      });
      setTimeout(() => setIsDeleted(true), 3500);
    } catch {
      setAlertInfo({ type: 'error', message: 'Failed to delete question' });
      setTimeout(() => setAlertInfo(null), 3500);
    }
  };

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) return;

    try {
      const added = await createEntity('answers', {
        content: newAnswer,
        questionId: data.id,
      });

      if (!added || !added.data.id || !added.data.content) {
        throw new Error('Invalid response from server');
      }

      setAnswers((prev) => [added.data, ...prev]);
      setNewAnswer('');
      setShowInput((prev) => !prev);
      setAlertInfo({ type: 'success', message: 'Answer added successfully' });
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', message: 'Failed to add answer' });
    }

    setTimeout(() => setAlertInfo(null), 3500);
  };

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
