import React, { useState } from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

function PostReply({ threadId }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Reply cannot be empty.');
      return;
    }

    if (!currentUser?.displayName) {
      setError('You must be logged in with a display name to reply.');
      return;
    }

    try {
      await addDoc(collection(db, 'threads', threadId, 'replies'), {
        text,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, 'threads', threadId), {
        replies: increment(1),
      });

      setText('');
    } catch (err) {
      setError('Failed to post reply.');
      console.error(err);
    }
  };

  return (
      <form className="post-reply-form" onSubmit={handleSubmit}>
        <h3>Post a Reply</h3>

        {error && <p className="auth-error">{error}</p>}

        <textarea
            placeholder="Write your reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
        />

        <button type="submit" className="new-thread-btn">
          Post Reply
        </button>
      </form>
  );
}

export default PostReply;
