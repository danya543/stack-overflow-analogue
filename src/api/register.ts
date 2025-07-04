import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';

export interface RegisterUserResponse {
  username: string;
  email: string;
  id: number;
}

interface RegisterUserPayload {
  username: string;
  password: string;
}

export async function registerUser(user: RegisterUserPayload) {
  const { data } = await axios.post<
    RegisterUserResponse,
    AxiosResponse<RegisterUserResponse>,
    RegisterUserPayload
  >(`${BASE_API_URL}/register`, user, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });

  return data;
}
