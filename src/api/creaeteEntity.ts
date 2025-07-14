import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import type { CreatePayloadMap, CreateResponseMap, EntityType } from './types';

export async function createEntity<K extends EntityType>(
  type: K,
  payload: CreatePayloadMap[K],
): Promise<CreateResponseMap[K]> {
  const url = `${BASE_API_URL}/${type}`;

  const { data } = await axios.post<
    CreateResponseMap[K],
    AxiosResponse<CreateResponseMap[K]>,
    CreatePayloadMap[K]
  >(url, payload, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
