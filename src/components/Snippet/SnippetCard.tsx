import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { setMark } from '@/api/mark';
import { SnippetProps } from '@/api/types';

import * as styles from './SnippetCard.module.scss';

export const SnippetCard = ({ data, userId }: { data: SnippetProps; userId: string }) => {
  const isLogged = sessionStorage.getItem('isAuthenticated') === 'true' ? true : false;
  const navigate = useNavigate();

  const likes = data.marks.filter((mark) => mark.type === 'like');
  const dislikes = data.marks.filter((mark) => mark.type === 'dislike');
  const [isLiked, setIsLiked] = useState(likes.some((el) => el.user.id === userId));
  const [isDisliked, setIsDisliked] = useState(dislikes.some((el) => el.user.id === userId));

  const handleMark = (id: number, mark: 'like' | 'dislike' | 'none') => {
    if (isLogged) {
      setMark({ id, content: { mark } })
        .then(() => console.log('add mark success'))
        .catch((err) => console.error(err));
      if (mark === 'like') {
        setIsLiked(true);
      } else if (mark === 'dislike') {
        setIsLiked(false);
      } else {
        setIsLiked(false);
      }
    }
  };

  return (
    <div className={styles.snippet}>
      <h3 className={styles.language}>{data.language} Snippet</h3>

      <div className={styles.code}>
        <SyntaxHighlighter
          language={data.language.toLowerCase()}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{ background: 'transparent', padding: 0 }}
        >
          {data.code}
        </SyntaxHighlighter>
      </div>

      <div className={styles.actions}>
        <div className={styles.marks}>
          <div className={styles.thumbs} onClick={() => handleMark(data.id, 'like')}>
            <ThumbsUp
              size={18}
              color={isLiked ? '#000000' : '#4caf50'}
              fill={isLiked ? '#4caf50' : 'none'}
            />
            <span>{likes.length}</span>
          </div>
          <div className={styles.thumbs} onClick={() => handleMark(data.id, 'dislike')}>
            <ThumbsDown
              size={18}
              color={isDisliked ? '#000000' : '#f44336'}
              fill={isDisliked ? '#f44336' : 'none'}
            />
            <span>{dislikes.length}</span>
          </div>
        </div>

        <button className={styles.commentsButton} onClick={() => navigate(`/post/${data.id}`)}>
          <MessageCircle size={18} /> Comments ({data.comments.length})
        </button>
      </div>
    </div>
  );
};
