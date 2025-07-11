import axios from 'axios';

import { BASE_API_URL } from './constants';
import { UserBase } from './types';

export async function deleteAccount() {
  const { data } = await axios.delete<UserBase>(`${BASE_API_URL}/auth/me`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
