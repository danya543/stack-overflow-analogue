import axios from 'axios';

import { BASE_API_URL } from './constants';
import { GetUsersPayload, GetUsersResponse } from './types';

export async function getUsers({
  page = 1,
  limit = 10,
  sortBy = ['createdAt:ASC'],
  search,
}: GetUsersPayload) {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  params.append('limit', limit.toString());

  sortBy.forEach((sort) => params.append('sortBy', sort));

  if (search && search.trim() !== '') {
    params.append('search', search);
  }

  const { data } = await axios.get<GetUsersResponse>(`${BASE_API_URL}/users?${params.toString()}`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
}
