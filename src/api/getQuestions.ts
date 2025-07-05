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
interface answerProps {
  id: string;
  content: string;
  isCorrect: boolean;
}
export interface questionProps {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers: answerProps[];
  user: userProps;
  isResolved: boolean;
}
export interface getQuestionsResponse {
  data: {
    data: questionProps[];
    meta: metaProps;
  };
}

interface getSnippetsPayload {
  page?: number;
  limit?: number;
  sortBy?:
    | 'id:ASC'
    | 'id:DESC'
    | 'title:ASC'
    | 'title:DESC'
    | 'description:ASC'
    | 'description:DESC'
    | 'attachedCode:ASC'
    | 'attachedCode:DESC';
}

export async function getQuestions({
  page = 1,
  limit = 15,
  sortBy = 'title:DESC',
}: getSnippetsPayload) {
  const { data } = await axios.get<getQuestionsResponse>(
    `${BASE_API_URL}/questions?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
}
