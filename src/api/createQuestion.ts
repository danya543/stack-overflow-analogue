import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { CreateQuestionPayload, CreateQuestionResponse } from './types';

export async function createQuestion(question: CreateQuestionPayload) {
  const { data } = await axios.post<
    CreateQuestionResponse,
    AxiosResponse<CreateQuestionResponse>,
    CreateQuestionPayload
  >(`${BASE_API_URL}/questions`, question, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
