import { Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteItem } from '@/api/delItem';
import { addMark } from '@/api/mark';
import { MarkType, SnippetProps } from '@/api/types';
import { socket } from '@/socket';
import { Alert, AlertProps } from '@/ui/Alert/Alert';
import { getUser, setAlert } from '@/ui/constants';

import { SnippetActions } from './SnippetActions';
import * as styles from './SnippetCard.module.scss';
import { SnippetCode } from './SnippetCode';
import { SnippetComments } from './SnippetComments';

interface SnippetCardProps {
  data: SnippetProps;
  userId: string;
  type: 'main' | 'post' | 'mine';
}

export const SnippetCard = ({ data, userId, type }: SnippetCardProps) => {
  const isLogged = getUser('auth');
  const navigate = useNavigate();
  const likes = data.marks.filter((m) => m.type === 'like');
  const dislikes = data.marks.filter((m) => m.type === 'dislike');

  const initialMark = likes.some((m) => m.user.id === userId)
    ? 'like'
    : dislikes.some((m) => m.user.id === userId)
      ? 'dislike'
      : 'none';

  const [mark, setMark] = useState<MarkType>(initialMark);
  const [likesCount, setLikes] = useState(likes.length);
  const [dislikesCount, setDislikes] = useState(dislikes.length);
  const [showComments, setShowComments] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const handler = ({
      snippetId,
      likes,
      dislikes,
    }: {
      snippetId: number;
      likes: number;
      dislikes: number;
    }) => {
      if (snippetId === data.id) {
        setLikes(likes);
        setDislikes(dislikes);
      }
    };

    socket.on('markUpdated', handler);

    return () => {
      socket.off('markUpdated', handler);
    };
  }, [data.id]);

  const handleMark = async (type: 'like' | 'dislike') => {
    if (!isLogged) {
      setAlert('error', 'Please log in to vote and see comments', setAlertInfo);
      return;
    }

    const newMark = mark === type ? 'none' : type;
    setMark(newMark);
    if (type === 'like') {
      setLikes((prev) => prev + (mark === 'dislike' ? 1 : mark === 'like' ? -1 : 1));
      setDislikes((prev) => (mark === 'dislike' ? prev - 1 : prev));
    } else {
      setDislikes((prev) => prev + (mark === 'like' ? 1 : mark === 'dislike' ? -1 : 1));
      setLikes((prev) => (mark === 'like' ? prev - 1 : prev));
    }

    await addMark({ id: data.id, content: { mark: newMark } });
    socket.emit('markChanged', { snippetId: data.id, mark: newMark });
  };

  const updateComments = (id: string, newContent: string) => {
    const updated = data.comments.map((c) => (c.id === id ? { ...c, content: newContent } : c));
    data.comments = updated;
  };

  const handleDeleteSnippet = async () => {
    try {
      await deleteItem('snippet', data.id);
      setAlertInfo({
        type: 'success',
        message: 'Snippet successfully deleted',
      });
      setIsDeleted(true);
    } catch {
      setAlertInfo({ type: 'error', message: 'Failed to delete snippet' });
    }
  };

  if (isDeleted) return null;

  return (
    <div className={styles.snippet}>
      {alertInfo && <Alert type={alertInfo.type} message={alertInfo.message} />}

      <h3 className={styles.language}>{data.language} Snippet</h3>
      <p className={styles.author}>snippet by: {data.user.username}</p>

      {type === 'mine' && (
        <div className={styles.editBtn}>
          <button onClick={() => navigate(`/snippets/edit/${data.id}`)}>
            <Edit />
          </button>
          <button onClick={handleDeleteSnippet}>
            <Trash />
          </button>
        </div>
      )}

      <SnippetCode language={data.language} code={data.code} />

      <SnippetActions
        mark={mark}
        likes={likesCount}
        dislikes={dislikesCount}
        commentsCount={data.comments.length}
        onLike={() => handleMark('like')}
        onDislike={() => handleMark('dislike')}
        onCommentsClick={() => {
          if (!isLogged) {
            setAlert('error', 'Please log in to vote and see comments', setAlertInfo);
            return;
          }
          if (type === 'mine' || type === 'main') navigate(`/post/${data.id}`);
          else setShowComments((prev) => !prev);
        }}
      />

      {type === 'post' && showComments && (
        <SnippetComments
          comments={data.comments}
          userId={userId}
          setAlertInfo={setAlertInfo}
          updateComments={updateComments}
        />
      )}
    </div>
  );
};
