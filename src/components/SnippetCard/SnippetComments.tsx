import { Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { deleteItem } from '@/api/delItem';
import { Comment } from '@/api/types';
import { updateEntity } from '@/api/updEntity';
import { Alert, AlertProps } from '@/ui/Alert/Alert';

import * as styles from './SnippetCard.module.scss';

export const SnippetComments = ({
  comments,
  userId,
  setAlertInfo,
  updateComments,
}: {
  comments: Comment[];
  userId: string;
  setAlertInfo: (alert: AlertProps | null) => void;
  updateComments: (id: string, newContent: string) => void;
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const save = async (id: string, old: string) => {
    if (editedText === old) {
      setEditingId(null);
      return;
    }

    try {
      await updateEntity('comments', id, { content: editedText });

      const updated = localComments.map((c) => (c.id === id ? { ...c, content: editedText } : c));
      setLocalComments(updated);
      updateComments(id, editedText);
      setEditingId(null);
    } catch {
      setAlertInfo({ type: 'error', message: 'Failed to update comment' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem('comment', id);
      setLocalComments((prev) => prev.filter((c) => c.id !== id));
      setAlertInfo({
        type: 'success',
        message: 'Successfully deleted comment',
      });
    } catch {
      setAlertInfo({ type: 'error', message: 'Failed to delete comment' });
    }
  };

  return (
    <div className={styles.comments}>
      {localComments.length === 0 ? (
        <Alert type="info" message="No comments for this snippet yet(" />
      ) : (
        localComments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            {editingId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className={styles.commentInput}
                />
                <div className={styles.editActions}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => save(comment.id, comment.content)}
                  >
                    Save
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p>
                <strong>{comment.user.username}</strong>: {comment.content}
              </p>
            )}
            {userId === comment.user.id && editingId !== comment.id && (
              <div className={styles.editBtn}>
                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditedText(comment.content);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(comment.id)}>
                  <Trash size={16} />
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
