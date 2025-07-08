import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { UpdateCommentPayload, UpdateCommentResponse } from './types';

export async function updComment({ content, id }: { content: string; id: string }) {
  const { data } = await axios.patch<
    UpdateCommentResponse,
    AxiosResponse<UpdateCommentResponse>,
    UpdateCommentPayload
  >(
    `${BASE_API_URL}/comments/${id}`,
    { content },
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
