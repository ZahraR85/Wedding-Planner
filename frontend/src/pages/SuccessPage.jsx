import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);

  /*useEffect(() => {
    // Extract session_id from query parameters
    const queryParams = new URLSearchParams(location.search);
    const session_id = queryParams.get('session_id');
    setSessionId(session_id);
  }, [location]); */
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const session_id = queryParams.get('session_id');
    if (session_id) {
      setSessionId(session_id);
    } else {
      console.error('No session_id found in the query string');
    }
  }, [location]);
  
  return (
    <div className="success-page">
      {sessionId ? (
        <div>
          <h1>Payment Successful!</h1>
          <p>Session ID: {sessionId}</p>
          {/* You can add more information like order details or confirmation */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SuccessPage;
