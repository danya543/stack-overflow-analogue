import Hide from '@/assets/icons/hide.png';
import View from '@/assets/icons/view.png';
import Logo from '@/assets/logo.png';

export const IMAGES = {
  Logo: Logo,
};

export const ICONS = {
  View: View,
  Hide: Hide,
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

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
export const usernameRegex = /^[a-zA-Z0-9_-]+$/;
