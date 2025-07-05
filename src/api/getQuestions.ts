import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetQuestionsPayload, GetQuestionsResponse } from './types';

export async function getQuestions({
  page = 1,
  limit = 15,
  sortBy = 'title:DESC',
}: GetQuestionsPayload) {
  const { data } = await axios.get<GetQuestionsResponse>(
    `${BASE_API_URL}/questions?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}
