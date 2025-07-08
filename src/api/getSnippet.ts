import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetSnippetResponse } from './types';

export async function getSnippet({ id }: { id: string }) {
  const { data } = await axios.get<GetSnippetResponse>(`${BASE_API_URL}/snippets/${id}`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
