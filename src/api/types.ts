// base types
export interface UserBase {
  id: number | string;
  username: string;
  role: string;
}

export interface Meta {
  currentPage: number;
  itemsPerPage: number;
  sortBy: string[];
  totalItems: number;
  totalPages: number;
}

//user stats
export interface UserStatistic {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
}

// user + stats
export interface UserWithStatistic extends UserBase {
  statistic: UserStatistic;
}

export interface GetUserInfoResponse {
  data: UserWithStatistic;
}

export interface GetUserInfoPayload {
  id: string;
}

// Snippet
export interface Mark {
  id: string;
  type: string;
  user: UserBase;
}

export interface Comment {
  id: string;
  content: string;
}

export interface SnippetProps {
  id: number;
  code: string;
  language: string;
  marks: Mark[];
  user: UserBase;
  comments: Comment[];
}
export interface GetSnippetResponse {
  data: SnippetProps;
}

export interface GetSnippetsResponse {
  data: {
    data: SnippetProps[];
    meta: Meta;
  };
}

export interface GetSnippetsPayload {
  page?: number;
  limit?: number;
  sortBy?: 'id:ASC' | 'id:DESC' | 'code:ASC' | 'code:DESC' | 'language:ASC' | 'language:DESC';
}

// Question
export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers: Answer[];
  user: UserBase;
  isResolved: boolean;
}

export interface GetQuestionsResponse {
  data: {
    data: Question[];
    meta: Meta;
  };
}

export interface GetQuestionsPayload {
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

// Users list
export interface GetUsersResponse {
  data: {
    data: UserBase[];
    meta: Meta;
  };
}

export interface GetUsersPayload {
  page?: number;
  limit?: number;
  sortBy?: Array<
    | 'id:ASC'
    | 'id:DESC'
    | 'username:ASC'
    | 'username:DESC'
    | 'role:ASC'
    | 'role:DESC'
    | 'createdAt:ASC'
    | 'createdAt:DESC'
  >;
  search?: string;
}

// authentification
export interface LoginUserResponse {
  data: {
    username: string;
    email: string;
    id: number;
  };
}

export interface LoginUserPayload {
  username: string;
  password: string;
}

export interface LogoutUserResponse {
  username: string;
  email: string;
  id: number;
}

export interface RegisterUserResponse {
  username: string;
  email: string;
  id: number;
}

export interface RegisterUserPayload {
  username: string;
  password: string;
}

export interface CreateCommentPayload {
  content: string;
  snippetId: string;
}
export interface UpdateCommentPayload {
  content: string;
}
export interface CreateCommentResponse {
  user: UserBase;
  content: string;
  id: number;
  snippet: SnippetProps;
}
export interface UpdateCommentResponse {
  data: { updatedCount: number };
  message: string;
}

export interface CreateSnippetResponse {
  data: {
    code: string;
    language: string;
    user: UserBase;
    id: string;
  };
}

export interface CreateSnippetPayload {
  code: string;
  language: string;
}

export interface MarkPayload {
  mark: 'like' | 'dislike' | 'none';
}
