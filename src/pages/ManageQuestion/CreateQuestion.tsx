import { Send } from 'lucide-react';

import { useQuestionEditor } from '@/hooks/useQuestionEditor';
import { Alert } from '@/ui/Alert/Alert';
import { Input } from '@/ui/Input';

import * as styles from './CreateQuestion.module.scss';

export const CreateQuestionPage = () => {
  const { questionContent, alert, error, isSubmitting, isFormValid, handleChange, handleSubmit } =
    useQuestionEditor('create');

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
          <Send size={16} /> Submit
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </form>
    </section>
  );
};
