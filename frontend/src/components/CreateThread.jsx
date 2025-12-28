import React, { useState } from 'react';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function CreateThread() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }

    if (!currentUser?.displayName) {
      setError('You must be logged in with a display name to post.');
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, 'threads'), {
        title: title.trim(),
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: serverTimestamp(),
        replies: 0,
        views: 0,
      });

      setTitle('');
    } catch (err) {
      console.error(err);
      setError('Failed to create thread. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <form className="create-thread-form" onSubmit={handleSubmit}>
        <h3>Start a New Discussion</h3>

        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <input
              type="text"
              placeholder="What do you want to discuss?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
              required
          />

          <button
              type="submit"
              className="new-thread-btn"
              disabled={submitting}
          >
            {submitting ? 'Posting…' : 'Post Thread'}
          </button>
        </div>
      </form>
  );
}

export default CreateThread;
