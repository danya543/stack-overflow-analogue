import Hide from '@/assets/icons/hide.png';
import View from '@/assets/icons/view.png';
import Logo from '@/assets/logo.png';
import User from '@/assets/user.png';

export const IMAGES = {
  Logo: Logo,
  User: User,
};

export const ICONS = {
  View: View,
  Hide: Hide,
};
export const SESSION_KEYS = {
  Auth: 'isAuthenticated',
  Id: 'user_id',
};

export const statsMap = [
  { key: 'snippetsCount', label: 'Snippets' },
  { key: 'rating', label: 'Rating' },
  { key: 'commentsCount', label: 'Comments' },
  { key: 'likesCount', label: 'Likes' },
  { key: 'dislikesCount', label: 'Dislikes' },
  { key: 'questionsCount', label: 'Questions' },
  { key: 'correctAnswersCount', label: 'Correct Answers' },
  { key: 'regularAnswersCount', label: 'Answers' },
];

export const getUser = (type: 'auth' | 'id') => {
  return type === 'auth'
    ? sessionStorage.getItem(SESSION_KEYS.Auth) === 'true'
    : JSON.parse(sessionStorage.getItem(SESSION_KEYS.Id));
};
export const localLogoutUser = () => {
  sessionStorage.removeItem(SESSION_KEYS.Auth);
  sessionStorage.removeItem(SESSION_KEYS.Id);
};

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
export const usernameRegex = /^[a-zA-Z0-9_-]+$/;
