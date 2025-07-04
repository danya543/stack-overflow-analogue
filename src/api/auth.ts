import axios from 'axios';

import { BASE_API_URL } from './constants';

export interface AuthUserResponse {
  username: string;
  role: string;
  id: number;
}

export async function getAuthUser() {
  const { data } = await axios.get<AuthUserResponse>(`${BASE_API_URL}/auth`, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });

  return data;
}
