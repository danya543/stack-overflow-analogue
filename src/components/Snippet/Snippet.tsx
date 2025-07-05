import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { snippetProps } from '@/api/getSnippets';

import * as styles from './Snippet.module.scss';

export const Snippet = ({ data }: { data: snippetProps }) => {
  const [showComments, setShowComments] = useState(false);

  const likes = data.marks.filter((mark) => mark.type === 'like').length;
  const dislikes = data.marks.filter((mark) => mark.type === 'dislike').length;

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
          <ThumbsUp size={18} color="#4caf50" />
          <span>{likes}</span>
          <ThumbsDown size={18} color="#f44336" />
          <span>{dislikes}</span>
        </div>

        <button className={styles.commentsButton} onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={18} /> Comments ({data.comments.length})
        </button>
      </div>

      {showComments && (
        <div className={styles.comments}>
          {data.comments.length > 0 ? (
            <ul className={styles.commentsList}>
              {data.comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  {comment.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noComments}>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};
