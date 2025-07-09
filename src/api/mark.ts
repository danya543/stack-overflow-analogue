import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { MarkPayload } from './types';

export async function setMark({ id, content }: { id: number; content: MarkPayload }) {
  const { data } = await axios.post<MarkPayload, AxiosResponse<MarkPayload>, MarkPayload>(
    `${BASE_API_URL}/snippets/${id}/mark`,
    content,
    {
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );

  return data;
}
