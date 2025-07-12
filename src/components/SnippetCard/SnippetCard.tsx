import { Edit, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { addMark } from '@/api/mark';
import { SnippetProps } from '@/api/types';
import { socket } from '@/socket';
import { Alert, AlertProps } from '@/ui/Alert/Alert';
import { getUser, setAlert } from '@/ui/constants';

import * as styles from './SnippetCard.module.scss';

interface SnippetCardProps {
  data: SnippetProps;
  userId: string;
  type: 'main' | 'post' | 'mine';
}

export const SnippetCard = ({ data, userId, type }: SnippetCardProps) => {
  const isLogged = getUser('auth');
  const navigate = useNavigate();

  const likes = data.marks.filter((mark) => mark.type === 'like');
  const dislikes = data.marks.filter((mark) => mark.type === 'dislike');

  const initialMark = likes.some((mark) => mark.user.id === userId)
    ? 'like'
    : dislikes.some((mark) => mark.user.id === userId)
      ? 'dislike'
      : 'none';

  const [mark, setMark] = useState<'like' | 'dislike' | 'none'>(initialMark);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [dislikesCount, setDislikesCount] = useState(dislikes.length);
  const [showComments, setShowComments] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);

  useEffect(() => {
    socket.on('markUpdated', ({ snippetId, likes, dislikes }) => {
      if (snippetId === data.id) {
        setLikesCount(likes);
        setDislikesCount(dislikes);
      }
    });

    return () => {
      socket.off('markUpdated');
    };
  }, [data.id]);

  const handleMark = async (id: number, type: 'like' | 'dislike') => {
    if (!isLogged) {
      setAlert('error', 'Please log in to vote and see comments', setAlertInfo);
      return;
    }

    let newMark: 'like' | 'dislike' | 'none' = mark === type ? 'none' : type;

    if (type === 'like') {
      if (mark === 'like') {
        setLikesCount((prev) => prev - 1);
      } else if (mark === 'dislike') {
        setDislikesCount((prev) => prev - 1);
        setLikesCount((prev) => prev + 1);
      } else {
        setLikesCount((prev) => prev + 1);
      }
    } else if (type === 'dislike') {
      if (mark === 'dislike') {
        setDislikesCount((prev) => prev - 1);
      } else if (mark === 'like') {
        setLikesCount((prev) => prev - 1);
        setDislikesCount((prev) => prev + 1);
      } else {
        setDislikesCount((prev) => prev + 1);
      }
    }

    setMark(newMark);

    addMark({ id, content: { mark: newMark } }).catch((err) => {
      console.error('Failed to set mark:', err);
    });
    socket.emit('markChanged', { snippetId: id, mark: newMark });
  };

  const handleOpenComments = () => {
    if (isLogged) {
      if (type === 'main') navigate(`/post/${data.id}`);
      else setShowComments((prev) => !prev);
    } else {
      setAlert('error', 'Please log in to vote and see comments', setAlertInfo);
    }
  };

  return (
    <div className={styles.snippet}>
      {alertInfo && <Alert type={alertInfo.type} message={alertInfo.message} />}

      <h3 className={styles.language}>{data.language} Snippet</h3>
      <p className={styles.author}>snippet by: {data.user.username}</p>
      {type === 'mine' && (
        <button onClick={() => navigate(`/snippets/edit/${data.id}`)} className={styles.editBtn}>
          <Edit />
        </button>
      )}

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
              color={mark === 'like' ? '#000000' : '#4caf50'}
              fill={mark === 'like' ? '#4caf50' : 'none'}
            />
            <span>{likesCount}</span>
          </div>
          <div className={styles.thumbs} onClick={() => handleMark(data.id, 'dislike')}>
            <ThumbsDown
              size={18}
              color={mark === 'dislike' ? '#000000' : '#f44336'}
              fill={mark === 'dislike' ? '#f44336' : 'none'}
            />
            <span>{dislikesCount}</span>
          </div>
        </div>

        <button className={styles.commentsButton} onClick={handleOpenComments}>
          <MessageCircle size={18} /> Comments ({data.comments.length})
        </button>
      </div>

      {(type === 'mine' || type === 'post') && showComments && (
        <div className={styles.comments}>
          {data.comments.length > 0 ? (
            data.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <p>
                  <strong>{comment.user.username}</strong>: {comment.content}
                </p>
              </div>
            ))
          ) : (
            <Alert type="info" message="No comments for this snippet yet(" />
          )}
        </div>
      )}
    </div>
  );
};
