import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { CreateSnippetPayload, CreateSnippetResponse } from './types';

export async function updSnippet(id: string, snippet: CreateSnippetPayload) {
  const { data } = await axios.patch<
    CreateSnippetResponse,
    AxiosResponse<CreateSnippetResponse>,
    CreateSnippetPayload
  >(`${BASE_API_URL}/snippets/${id}`, snippet, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
