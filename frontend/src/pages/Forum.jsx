import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../components/AuthContext';
import ThreadItem from '../components/ThreadItem';
import CreateThread from '../components/CreateThread';
import "./Forum.css"

function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for errors
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError(null); // Clear previous errors
    
    try {
      const threadsRef = collection(db, 'threads');
      const q = query(threadsRef, orderBy('createdAt', 'desc'));

      // onSnapshot now has a second argument: an error handler
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => { // Success handler
          const threadsData = [];
          querySnapshot.forEach((doc) => {
            threadsData.push({ ...doc.data(), id: doc.id });
          });
          setThreads(threadsData);
          setLoading(false);
        }, 
        (err) => { // Error handler
          console.error("Firestore Error:", err);
          setError(err.message); // Save the error message
          setLoading(false);
        }
      );

      // Cleanup listener
      return () => unsubscribe();
      
    } catch (err) {
      // This catches any immediate errors (e.g., bad collection path)
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  }, []); // Empty array means this runs once on mount

  return (
    <div>
      <h1 className="page-header">Community Forum</h1>

      {currentUser ? (
        <CreateThread />
      ) : (
        <p className="auth-switch" style={{textAlign: 'left', margin: '2rem 0'}}>
          Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to create a thread.
        </p>
      )}

      {/* New, improved loading/error/content section */}
      {loading && <p>Loading threads...</p>}
      
      {error && (
        <div className="auth-error">
          <p><strong>Error loading threads:</strong></p>
          <p style={{fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '1rem'}}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="forum-list">
          {threads.length === 0 && (
            <p style={{padding: '2rem', textAlign: 'center', backgroundColor: 'var(--content-bg)'}}>
              No threads yet. Be the first to post!
            </p>
          )}
          
          {threads.map(thread => (
            <ThreadItem
              key={thread.id}
              id={thread.id}
              title={thread.title}
              authorName={thread.authorName}
              date={thread.createdAt}
              replies={thread.replies}
              views={thread.views}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Forum;