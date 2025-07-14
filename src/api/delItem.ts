import axios from 'axios';

import { BASE_API_URL } from './constants';
import { DeleteResponseMap, ItemType } from './types';

export async function deleteItem<T extends ItemType>(
  type: T,
  id?: string | number | null,
): Promise<DeleteResponseMap[T]> {
  let url = '';

  switch (type) {
    case 'comment':
      url = `/comments/${id}`;
      break;
    case 'question':
      url = `/questions/${id}`;
      break;
    case 'snippet':
      url = `/snippets/${id}`;
      break;
    case 'account':
      url = '/auth/me';
      break;
    case 'answer':
      url = `/answers/${id}`;
      break;
    default:
      throw new Error('Invalid delete type');
  }

  const { data } = await axios.delete<DeleteResponseMap[T]>(`${BASE_API_URL}${url}`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
