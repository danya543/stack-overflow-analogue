import axios, { type AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import { ChangePasswordPayload, ChangePasswordResponse } from './types';

export async function changePassword(body: ChangePasswordPayload) {
  const { data } = await axios.patch<
    ChangePasswordResponse,
    AxiosResponse<ChangePasswordResponse>,
    ChangePasswordPayload
  >(`${BASE_API_URL}/me/password`, body, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
