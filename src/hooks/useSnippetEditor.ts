import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createEntity } from '@/api/creaeteEntity';
import { getLanguages } from '@/api/getLanguages';
import { getSnippet } from '@/api/getSnippet';
import { CreateSnippetPayload } from '@/api/types';
import { updateEntity } from '@/api/updEntity';

type AlertType = 'success' | 'error';

interface Alert {
  type: AlertType;
  message: string;
}

export const useSnippetEditor = (mode: 'create' | 'edit', id?: string) => {
  const [snippetContent, setSnippetContent] = useState<CreateSnippetPayload>({
    code: '',
    language: '',
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [languagesError, setLanguagesError] = useState<string | null>(null);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSnippet, setLoadingSnippet] = useState(mode === 'edit');
  const navigate = useNavigate();

  useEffect(() => {
    getLanguages()
      .then((res) => setLanguages(res.data))
      .catch(() => setLanguagesError('Failed to load languages'))
      .finally(() => setLoadingLanguages(false));
  }, []);

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoadingSnippet(true);
      getSnippet({ id })
        .then((res) => {
          const { code, language } = res.data;
          setSnippetContent({ code, language });
        })
        .catch(() => {
          setAlert({ type: 'error', message: 'Failed to load snippet data' });
        })
        .finally(() => setLoadingSnippet(false));
    }
  }, [mode, id]);

  const isLatinOnly = (text: string) => /^[a-zA-Z+\-#]+$/.test(text);
  const isFormValid = snippetContent.code.trim() !== '' && snippetContent.language !== '';

  const handleCodeChange = (code: string) => {
    setSnippetContent((prev) => ({ ...prev, code }));
  };

  const handleLanguageChange = (language: string) => {
    setSnippetContent((prev) => ({ ...prev, language }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { code, language } = snippetContent;

    if (!language || !languages.includes(language)) {
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
      setIsSubmitting(true);

      if (mode === 'create') {
        await createEntity('snippets', snippetContent);
        setSnippetContent({ code: '', language: '' });
        setAlert({ type: 'success', message: 'Snippet successfully created!' });
      } else if (mode === 'edit' && id) {
        await updateEntity('snippets', id, snippetContent);
        setAlert({ type: 'success', message: 'Snippet successfully updated!' });
        setTimeout(() => {
          setAlert(null);
        }, 3500);
      }
      navigate('/snippets/my');
    } catch {
      setAlert({
        type: 'error',
        message: mode === 'create' ? 'Creating snippet failed' : 'Updating snippet failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    snippetContent,
    languages,
    loadingLanguages,
    loadingSnippet,
    languagesError,
    alert,
    isFormValid,
    isSubmitting,
    handleCodeChange,
    handleLanguageChange,
    handleSubmit,
    setAlert,
  };
};
