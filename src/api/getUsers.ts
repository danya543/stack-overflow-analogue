import axios from 'axios';

import { BASE_API_URL } from './constants';

export interface userProps {
  username: string;
  role: string;
  id: number;
}
export interface getUsersResponse {
  data: {
    data: userProps[];
  };
}

interface getUsersPayload {
  page?: number;
  limit?: number;
}

export async function getUsers({ page = 1, limit = 10 }: getUsersPayload) {
  const { data } = await axios.get<getUsersResponse>(
    `${BASE_API_URL}/users?page=${page}&limit=${limit}`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}
