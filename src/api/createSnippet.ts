import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { CreateSnippetPayload, CreateSnippetResponse } from './types';

export async function createSnippet(snippet: CreateSnippetPayload) {
  const { data } = await axios.post<
    CreateSnippetResponse,
    AxiosResponse<CreateSnippetResponse>,
    CreateSnippetPayload
  >(`${BASE_API_URL}/snippets`, snippet, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
