import { useEffect, useState } from 'react';

import { createSnippet } from '@/api/createSnippet';
import { getLanguages } from '@/api/getLanguages';
import { CreateSnippetPayload } from '@/api/types';

type AlertType = 'success' | 'error';

interface Alert {
  type: AlertType;
  message: string;
}

export const useCreateSnippet = () => {
  const [snippetContent, setSnippetContent] = useState<CreateSnippetPayload>({
    code: '',
    language: '',
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [languagesError, setLanguagesError] = useState<string | null>(null);

  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    setLoadingLanguages(true);
    getLanguages()
      .then((response) => {
        setLanguages(response.data);
        setLanguagesError(null);
      })
      .catch(() => setLanguagesError('Failed to load languages'))
      .finally(() => setLoadingLanguages(false));
  }, []);

  const isLatinOnly = (text: string) => /^[a-zA-Z+\-#]+$/.test(text);

  const isFormValid = snippetContent.code.trim() !== '' && snippetContent.language !== '';

  const handleCodeChange = (value: string) => {
    setSnippetContent((prev) => ({ ...prev, code: value }));
  };

  const handleLanguageChange = (value: string) => {
    setSnippetContent((prev) => ({ ...prev, language: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { code, language } = snippetContent;

    if (!language) {
      setAlert({ type: 'error', message: 'Choose a language' });
      return;
    }

    if (!languages.includes(language)) {
      setAlert({
        type: 'error',
        message: `Language "${language}" is not supported`,
      });
      return;
    }

    if (language !== 'JavaScript' && !isLatinOnly(language)) {
      setAlert({
        type: 'error',
        message: 'Language must contain only Latin characters',
      });
      return;
    }

    if (!code.trim()) {
      setAlert({ type: 'error', message: 'Code cannot be empty' });
      return;
    }

    try {
      await createSnippet(snippetContent);
      setSnippetContent({ code: '', language: '' });
      setAlert({ type: 'success', message: 'Snippet successfully created!' });
    } catch {
      setAlert({ type: 'error', message: 'Creating snippet failed' });
    }
  };

  return {
    snippetContent,
    languages,
    loadingLanguages,
    languagesError,
    alert,
    isFormValid,
    handleCodeChange,
    handleLanguageChange,
    handleSubmit,
    setAlert,
  };
};
