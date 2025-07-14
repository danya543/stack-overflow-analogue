import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetUserInfoPayload, GetUserInfoResponse } from './types';

export async function getUserInfo({ id }: GetUserInfoPayload) {
  const { data } = await axios.get<GetUserInfoResponse>(`${BASE_API_URL}/users/${id}/statistic`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
