import { useEffect, useRef } from 'react';

import { useSnippetEditor } from '@/hooks/useSnippetEditor';
import { Alert } from '@/ui/Alert/Alert';

import * as styles from './CreateSnippet.module.scss';

export const CreateSnippetPage = () => {
  const {
    snippetContent,
    languages,
    alert,
    isFormValid,
    handleCodeChange,
    handleLanguageChange,
    handleSubmit,
  } = useSnippetEditor('create');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [snippetContent.code]);

  return (
    <div className={styles.wrapper}>
      <h1>Create new snippet</h1>

      <form onSubmit={handleSubmit}>
        <select
          className={styles.select}
          value={snippetContent.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="">Choose language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <textarea
          ref={textareaRef}
          placeholder="Enter code"
          value={snippetContent.code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className={styles.textarea}
          rows={4}
        />

        <button className={styles.submitBtn} type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>

      {alert && <Alert type={alert.type} message={alert.message} />}
    </div>
  );
};
