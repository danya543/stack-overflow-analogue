import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

import { MarkType } from '@/api/types';

import * as styles from './SnippetCard.module.scss';

interface Props {
  mark: MarkType;
  likes: number;
  dislikes: number;
  commentsCount: number;
  onLike: () => void;
  onDislike: () => void;
  onCommentsClick: () => void;
}

export const SnippetActions = ({
  mark,
  likes,
  dislikes,
  commentsCount,
  onLike,
  onDislike,
  onCommentsClick,
}: Props) => (
  <div className={styles.actions}>
    <div className={styles.marks}>
      <div className={styles.thumbs} onClick={onLike}>
        <ThumbsUp
          size={18}
          color={mark === 'like' ? '#000' : '#4caf50'}
          fill={mark === 'like' ? '#4caf50' : 'none'}
        />
        <span>{likes}</span>
      </div>
      <div className={styles.thumbs} onClick={onDislike}>
        <ThumbsDown
          size={18}
          color={mark === 'dislike' ? '#000' : '#f44336'}
          fill={mark === 'dislike' ? '#f44336' : 'none'}
        />
        <span>{dislikes}</span>
      </div>
    </div>

    <button className={styles.commentsButton} onClick={onCommentsClick}>
      <MessageCircle size={18} /> Comments ({commentsCount})
    </button>
  </div>
);
