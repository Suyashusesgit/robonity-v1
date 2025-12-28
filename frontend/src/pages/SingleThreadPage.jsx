import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';
import PostReply from '../components/PostReply';
import ReplyItem from '../components/ReplyItem';

function SingleThreadPage() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loadingThread, setLoadingThread] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const [error, setError] = useState('');

  // Effect to fetch the main thread data
  useEffect(() => {
    const fetchThread = async () => {
      setLoadingThread(true);
      setError('');
      try {
        const docRef = doc(db, 'threads', threadId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setThread({ ...docSnap.data(), id: docSnap.id });
        } else {
          setError('Thread not found.');
        }
      } catch (err) {
        setError('Failed to load thread: ' + err.message);
      }
      setLoadingThread(false);
    };
    fetchThread();
  }, [threadId]);

  // Effect to listen for replies in real-time
  useEffect(() => {
    setLoadingReplies(true);
    // Note: We don't clear the main 'error' here, in case the thread itself failed to load
    
    try {
      const repliesRef = collection(db, 'threads', threadId, 'replies');
      const q = query(repliesRef, orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => { // Success
          const repliesData = [];
          querySnapshot.forEach((doc) => {
            repliesData.push({ ...doc.data(), id: doc.id });
          });
          setReplies(repliesData);
          setLoadingReplies(false);
        }, 
        (err) => { // Error
          console.error("Firestore Replies Error:", err);
          setError("Failed to load replies: " + err.message); // This will show the new error
          setLoadingReplies(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      setError("Failed to set up replies listener: " + err.message);
      setLoadingReplies(false);
    }
  }, [threadId]);

  // Combined loading state
  const isLoading = loadingThread || loadingReplies;

  if (isLoading) return <p>Loading thread...</p>;

  // Display error
  if (error) {
    return (
      <div className="auth-error">
        <p><strong>An error occurred:</strong></p>
        <p style={{fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '1rem', wordBreak: 'break-all'}}>{error}</p>
        <Link to="/forum" className="back-link" style={{marginTop: '1rem', color: '#fff'}}>Back to Forum</Link>
      </div>
    );
  }

  if (!thread) return <p>Thread not found.</p>;

  // --- Normal Page Render ---
  return (
    <div>
      <Link to="/forum" className="back-link">&larr; Back to Forum</Link>
      
      <div className="thread-content">
        <h1 className="page-header">{thread.title}</h1>
        <p className="thread-author">
          Posted by <strong>{thread.authorName || 'Anonymous'}</strong>
        </p>
      </div>

      <div className="reply-list">
        <h3>Replies</h3>
        {replies.length === 0 && (
          <p style={{color: 'var(--text-muted)', margin: '1rem 0'}}>
            Be the first to reply.
          </p>
        )}
        {replies.map(reply => (
          <ReplyItem key={reply.id} reply={reply} />
        ))}
      </div>

      {currentUser ? (
        <PostReply threadId={threadId} />
      ) : (
        <p className="auth-switch" style={{textAlign: 'left', margin: '2rem 0'}}>
          Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to reply.
        </p>
      )}
    </div>
  );
}

export default SingleThreadPage;