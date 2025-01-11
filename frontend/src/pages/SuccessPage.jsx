import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const SuccessPage = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const session_id = queryParams.get('session_id');
    setSessionId(session_id);
  }, [location]);

  return (
    <div className="relative min-h-screen bg-cover bg-center p-4 bg-[url('https://i.postimg.cc/Kv1WnL9Q/photography.png')]">
      {/* Overlay to make text more readable on top of the background image */}
      <div className="absolute inset-0 bg-white/60"></div>
      
      {/* Main content container with padding and shadow */}
      <div className="relative mx-auto w-full max-w-[calc(100%-40px)] sm:max-w-[calc(60%-130px)] bg-opacity-80 shadow-lg rounded-lg p-4 sm:p-8 space-y-5">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-BgFont my-4 lg:my-16">
          🎉 Payment Successful! 🎉
        </h1>
        
        {/* Toast notifications (if any) */}
        <ToastContainer />
        
        {/* Description box for session ID */}
        <div className="mt-4 text-BgFont bg-BgPink p-4 rounded-lg shadow-md">
          {/* Payment confirmation message */}
          <h2 className="font-bold text-lg">Thank you for your purchase!</h2>
          <p className="mt-2">
            Your payment has been successfully processed. We appreciate your business and look forward to serving you again. Below is your unique session ID for reference:
          </p>
          
          {/* Display the session ID */}
          <p className="mt-2">
            {sessionId ? sessionId : "Loading your session ID..."}
          </p>
        </div>

        {/* Thank you message */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-BgFont">
            If you have any questions or need further assistance, don't hesitate to contact us. We are here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
