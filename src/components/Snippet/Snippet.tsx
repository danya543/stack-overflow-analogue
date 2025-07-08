import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { SnippetProps } from '@/api/types';

import * as styles from './Snippet.module.scss';

export const SnippetCard = ({ data }: { data: SnippetProps }) => {
  const navigate = useNavigate();

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

        <button className={styles.commentsButton} onClick={() => navigate(`/post/${data.id}`)}>
          <MessageCircle size={18} /> Comments ({data.comments.length})
        </button>
      </div>
    </div>
  );
};
