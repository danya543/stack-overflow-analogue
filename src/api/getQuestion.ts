import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetQuestionResponse } from './types';

export async function getQuestion({ id }: { id: string }) {
  const { data } = await axios.get<GetQuestionResponse>(`${BASE_API_URL}/questions/${id}`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
