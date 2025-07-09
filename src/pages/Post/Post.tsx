import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createComment } from '@/api/createComment';
import { getSnippet } from '@/api/getSnippet';
import { SnippetProps } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { SnippetCard } from '@/components/Snippet/SnippetCard';
import { Input } from '@/ui/Input';

import * as styles from './Post.module.scss';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SnippetProps | null>(null);
  const [commentMsg, setCommentMsg] = useState('');
  const userId = sessionStorage.getItem('user_id');

  useEffect(() => {
    getSnippet({ id })
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentMsg(value);
  };

  const handleSubmit = () => {
    if (commentMsg.length > 3) {
      createComment({ content: commentMsg, snippetId: id });
    } else {
      console.warn('comment must be more than 3 chars');
    }
  };

  return (
    <section>
      {data ? (
        <div>
          <SnippetCard data={data} userId={userId} key={data.id} />
          <div className={styles.addComment}>
            <Input placeholder={'Add you comment'} value={commentMsg} onChange={handleInput} />
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
