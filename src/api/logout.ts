import axios from 'axios';

import { BASE_API_URL } from './constants';
import { LogoutUserResponse } from './types';

export async function logoutUser() {
  const { data } = await axios.post<LogoutUserResponse>(`${BASE_API_URL}/auth/logout`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return data;
}
