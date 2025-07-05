import axios from 'axios';

import { BASE_API_URL } from './constants';

interface metaProps {
  currentPage: number;
  itemsPerPage: number;
  sortBy: [];
  totalItems: number;
  totalPages: number;
}
interface userProps {
  id: string;
  username: string;
  role: string;
}
export interface snippetProps {
  id: number;
  code: string;
  language: string;
  marks: [
    {
      id: string;
      type: string;
      user: userProps;
    },
  ];
  user: userProps;
  comments: [{ id: string; content: string }];
}
export interface getSnippetsResponse {
  data: {
    data: snippetProps[];
    meta: metaProps;
  };
}

interface getSnippetsPayload {
  page?: number;
  limit?: number;
  sortBy?: 'id:ASC' | 'id:DESC' | 'code:ASC' | 'code:DESC' | 'language:ASC' | 'language:DESC';
}

export async function getSnippets({ page = 1, limit = 15, sortBy }: getSnippetsPayload) {
  const { data } = await axios.get<getSnippetsResponse>(
    `${BASE_API_URL}/snippets?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}
