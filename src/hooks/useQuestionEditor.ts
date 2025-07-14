import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createEntity } from '@/api/creaeteEntity';
import { getQuestion } from '@/api/getQuestion';
import { CreateQuestionPayload } from '@/api/types';
import { updateEntity } from '@/api/updEntity';

type AlertType = 'success' | 'error';

interface Alert {
  type: AlertType;
  message: string;
}

export const useQuestionEditor = (mode: 'create' | 'edit', id?: string) => {
  const [questionContent, setQuestionContent] = useState<CreateQuestionPayload>({
    title: '',
    description: '',
    attachedCode: '',
  });

  const [loadingQuestion, setLoadingQuestion] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoadingQuestion(true);
      getQuestion({ id })
        .then((res) => {
          const { title, description, attachedCode } = res.data;
          setQuestionContent({ title, description, attachedCode });
        })
        .catch(() => {
          setAlert({ type: 'error', message: 'Failed to load question data' });
        })
        .finally(() => setLoadingQuestion(false));
    }
  }, [mode, id]);

  const isFormValid =
    questionContent.title.trim() !== '' &&
    questionContent.description.trim() !== '' &&
    questionContent.attachedCode.trim() !== '';

  const handleChange =
    (field: keyof CreateQuestionPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestionContent({ ...questionContent, [field]: e.target.value });
      if (error) setError('');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        await createEntity('questions', questionContent);
        setQuestionContent({ title: '', description: '', attachedCode: '' });
        setAlert({
          type: 'success',
          message: 'Question successfully created!',
        });
      } else if (mode === 'edit' && id) {
        await updateEntity('questions', id, questionContent);
        setAlert({
          type: 'success',
          message: 'Question successfully updated!',
        });
      }

      setTimeout(() => {
        navigate('/questions/my');
      }, 3500);
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (Array.isArray(errors)) {
        setError(errors.flatMap((fieldError) => fieldError.failures).join('\n'));
      } else {
        setError(err?.response?.data?.message || 'Something went wrong!');
      }
      setAlert({
        type: 'error',
        message: mode === 'create' ? 'Creating question failed' : 'Updating question failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    questionContent,
    alert,
    error,
    isSubmitting,
    loadingQuestion,
    isFormValid,
    handleChange,
    handleSubmit,
    setAlert,
    setError,
  };
};
