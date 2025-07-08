import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetSnippetsPayload, GetSnippetsResponse } from './types';

export async function getSnippets({ page = 1, limit = 15, sortBy }: GetSnippetsPayload) {
  const { data } = await axios.get<GetSnippetsResponse>(
    `${BASE_API_URL}/snippets?page=${page}&limit=${limit}&sortBy=${sortBy}`,
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
