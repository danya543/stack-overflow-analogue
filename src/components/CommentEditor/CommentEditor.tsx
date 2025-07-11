import { Send } from 'lucide-react';
import { FC, useState } from 'react';

import { createComment } from '@/api/createComment';
import { updComment } from '@/api/updComment';
import { socket } from '@/socket';
import { Input } from '@/ui/Input';

import * as styles from './CommentEditor.module.scss';

interface CommentEditorProps {
  snippetId: string;
  comment?: { id: string; content: string };
  onSuccess: (newComment: unknown) => void;
  onCancel?: () => void;
}

export const CommentEditor: FC<CommentEditorProps> = ({
  snippetId,
  comment,
  onSuccess,
  onCancel,
}) => {
  const [msg, setMsg] = useState(comment?.content ?? '');

  const isEdit = Boolean(comment?.id);

  const handleSubmit = async () => {
    const trimmed = msg.trim();
    if (trimmed.length <= 3) return alert('Comment must be more than 3 characters');

    try {
      if (isEdit) {
        const res = await updComment({ id: comment!.id, content: trimmed });
        alert('Comment updated!');
        onSuccess(res.data);
        if (onCancel) onCancel();
      } else {
        const res = await createComment({ content: trimmed, snippetId });
        socket.emit('commentAdded', { comment: res.data, snippetId });
        socket.emit('newComment', res.data);
        onSuccess(res.data);
        setMsg('');
      }
    } catch (err) {
      console.error('Comment submit failed:', err);
    }
  };

  return (
    <div className={styles.editor}>
      <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your comment" />
      <button onClick={handleSubmit}>
        <Send />
      </button>
      {isEdit && onCancel && (
        <button className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};
