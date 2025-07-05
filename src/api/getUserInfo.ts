import axios from 'axios';

import { BASE_API_URL } from './constants';

interface userStatistic {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
}
export interface userProps {
  username: string;
  role: string;
  id: number;
  statistic: userStatistic;
}
export interface getUserInfoResponse {
  data: userProps;
}

interface getUserInfoPayload {
  id: string;
}

export async function getUserInfo({ id }: getUserInfoPayload) {
  const { data } = await axios.get<getUserInfoResponse>(`${BASE_API_URL}/users/${id}/statistic`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return data;
}
