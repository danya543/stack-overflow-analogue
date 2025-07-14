import { Send } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import { useQuestionEditor } from '@/hooks/useQuestionEditor';
import { Alert } from '@/ui/Alert/Alert';
import { Input } from '@/ui/Input';

import * as styles from './CreateQuestion.module.scss';

export const EditQuestionPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    questionContent,
    alert,
    error,
    isSubmitting,
    loadingQuestion,
    isFormValid,
    handleChange,
    handleSubmit,
  } = useQuestionEditor('edit', id);

  if (loadingQuestion) return <Loader />;

  return (
    <section className={styles.container}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input placeholder="Title" value={questionContent.title} onChange={handleChange('title')} />
        <textarea
          placeholder="Description"
          value={questionContent.description}
          className={styles.textarea}
          onChange={handleChange('description')}
        />
        <textarea
          placeholder="Code"
          value={questionContent.attachedCode}
          className={styles.codeArea}
          onChange={handleChange('attachedCode')}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isFormValid || isSubmitting}
        >
          <Send size={16} /> Update
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </form>
    </section>
  );
};
