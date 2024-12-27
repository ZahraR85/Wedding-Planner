import { useAppContext } from '../context/AppContext';
//import AdminVenuePage from './AdminVenuePage.jsx';
import Gallery from '../pages/Gallery.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminPanel = () => {
  const { userId, isAuthenticated, role } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      navigate('/'); // Redirect unauthorized users
    }
  }, [isAuthenticated, role, navigate]);

  if (!isAuthenticated || role !== 'admin') {
    return <h1>Access Denied</h1>;
  }

  return (
    <div>
      <Gallery />
      {/*<AdminVenuePage />*/}
    </div>
  );
};

export default AdminPanel;
