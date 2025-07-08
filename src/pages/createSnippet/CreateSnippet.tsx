import { useState } from 'react';

import { createSnippet } from '@/api/createSnippet';
import { CreateSnippetPayload } from '@/api/types';
import { Input } from '@/ui/Input';

export const CreateSnippetPage = () => {
  const [snippetContent, setSnippetContent] = useState<CreateSnippetPayload>({
    code: '',
    language: '',
  });

  const [error, setError] = useState<string | null>(null);

  const supportedLanguages = ['javascript'];

  const handleSubmit = () => {
    setError(null);

    if (!snippetContent.language) {
      setError('Choose language');
      return;
    }

    if (!supportedLanguages.includes(snippetContent.language)) {
      setError('only JavaScript');
      return;
    }

    createSnippet(snippetContent)
      .then(() => {
        console.log('ok');
        setSnippetContent({ code: '', language: '' });
      })
      .catch((err) => {
        console.error(err);
        setError('Creating snippet failed');
      });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnippetContent((prev) => ({ ...prev, code: e.target.value }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSnippetContent((prev) => ({ ...prev, language: e.target.value }));
  };

  return (
    <div className={''}>
      <h1>Create new snippet</h1>
      <Input placeholder="Enter code" value={snippetContent.code} onChange={handleCodeChange} />

      <select value={snippetContent.language} onChange={handleLanguageChange}>
        <option value="javascript2">JavaScript2</option>
        <option value="javascript1">JavaScript1</option>
        <option value="javascript">JavaScript</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>

      {error && <p>{error}</p>}
    </div>
  );
};
