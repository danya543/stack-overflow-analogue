import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetSnippetLanguagesResponse } from './types';

export async function getLanguages() {
  const { data } = await axios.get<GetSnippetLanguagesResponse>(
    `${BASE_API_URL}/snippets/languages`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  return data;
}
