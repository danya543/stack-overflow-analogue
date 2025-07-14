import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';
import type { EntityType, UpdPayloadMap, UpdResponseMap } from './types';

export async function updateEntity<K extends EntityType>(
  type: K,
  id: string,
  payload: UpdPayloadMap[K],
): Promise<UpdResponseMap[K]> {
  const url = `${BASE_API_URL}/${type}/${id}`;

  const { data } = await axios.patch<
    UpdResponseMap[K],
    AxiosResponse<UpdResponseMap[K]>,
    UpdPayloadMap[K]
  >(url, payload, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
