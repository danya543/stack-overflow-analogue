import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { CreateCommentPayload, CreateCommentResponse } from './types';

export async function createComment(comment: CreateCommentPayload) {
  const { data } = await axios.post<
    CreateCommentResponse,
    AxiosResponse<CreateCommentResponse>,
    CreateCommentPayload
  >(`${BASE_API_URL}/comments`, comment, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return data;
}
