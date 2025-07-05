import axios from 'axios';

import { BASE_API_URL } from './constants';
import { UserBase } from './types';

export async function getAuthUser() {
  const { data } = await axios.get<UserBase>(`${BASE_API_URL}/auth`, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });

  return data;
}
