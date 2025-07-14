import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createEntity } from '@/api/creaeteEntity';
import { getSnippet } from '@/api/getSnippet';
import { SnippetProps } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { SnippetCard } from '@/components/SnippetCard/SnippetCard';
import { socket } from '@/socket';
import { getUser } from '@/ui/constants';
import { Input } from '@/ui/Input';

import * as styles from './Post.module.scss';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SnippetProps | null>(null);
  const [commentMsg, setCommentMsg] = useState('');
  const userId = getUser('id');

  useEffect(() => {
    getSnippet({ id })
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    socket.emit('joinSnippetRoom', id);

    socket.on('newComment', (comment) => {
      setData((prev) => {
        if (!prev) return prev;

        if (prev.comments.some((c) => c.id === comment.id)) return prev;

        return { ...prev, comments: [...prev.comments, comment] };
      });
    });

    return () => {
      socket.emit('leaveSnippetRoom', id);
      socket.off('newComment');
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentMsg(e.target.value);
  };

  const handleSubmit = async () => {
    const trimmed = commentMsg.trim();
    if (trimmed.length <= 3) {
      console.warn('Comment must be more than 3 characters');
      return;
    }

    try {
      const response = await createEntity('comments', {
        content: trimmed,
        snippetId: id,
      });
      const newComment = response.data;

      setData((prev) => (prev ? { ...prev, comments: [...prev.comments, newComment] } : prev));

      socket.emit('commentAdded', { comment: newComment, snippetId: id });
      socket.emit('newComment', newComment);

      setCommentMsg('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  return (
    <section>
      {data ? (
        <div>
          <SnippetCard data={data} userId={userId} key={data.id} type={'post'} />
          <div className={styles.addComment}>
            <Input placeholder={'Add your comment'} value={commentMsg} onChange={handleInput} />
            <button type="submit" onClick={handleSubmit}>
              <Send />
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};
