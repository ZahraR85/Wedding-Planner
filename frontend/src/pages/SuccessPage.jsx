import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Session ID: {sessionId}</p>
    </div>
  );
};

export default SuccessPage;
