import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { RegisterUserPayload, RegisterUserResponse } from './types';

export async function registerUser(user: RegisterUserPayload) {
  const { data } = await axios.post<
    RegisterUserResponse,
    AxiosResponse<RegisterUserResponse>,
    RegisterUserPayload
  >(`${BASE_API_URL}/register`, user, {
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return data;
}
