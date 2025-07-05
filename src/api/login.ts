import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { LoginUserPayload, LoginUserResponse } from './types';

export async function loginUser(user: LoginUserPayload) {
  const { data } = await axios.post<
    LoginUserResponse,
    AxiosResponse<LoginUserResponse>,
    LoginUserPayload
  >(`${BASE_API_URL}/auth/login`, user, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  });

  return data;
}
