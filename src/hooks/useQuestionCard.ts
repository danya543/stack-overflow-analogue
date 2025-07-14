import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createEntity } from '@/api/creaeteEntity';
import { deleteItem } from '@/api/delItem';
import { Question } from '@/api/types';
import { AlertProps } from '@/ui/Alert/Alert';

export function useQuestionCard(data: Question, userId: string) {
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
      setShowInput(false);
      setAlertInfo({ type: 'success', message: 'Answer added successfully' });
    } catch (err) {
      console.error(err);
      setAlertInfo({ type: 'error', message: 'Failed to add answer' });
    }

    setTimeout(() => setAlertInfo(null), 3500);
  };

  return {
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
  };
}
