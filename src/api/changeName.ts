import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { ChangeNamePayload, ChangeNameResponse } from './types';

export async function changeName(body: ChangeNamePayload) {
  const { data } = await axios.patch<
    ChangeNameResponse,
    AxiosResponse<ChangeNameResponse>,
    ChangeNamePayload
  >(`${BASE_API_URL}/me`, body, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
