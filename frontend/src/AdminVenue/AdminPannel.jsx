import { useAppContext } from '../context/AppContext';
import AdminVenuePage from './AdminVenuePage.jsx';
import Gallery from '../pages/Gallery.jsx';
const AdminPanel = () => {
  const { isAuthenticated } = useAppContext();
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated || userRole !== 'admin') {
    return <h1>Access Denied</h1>; 
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <Gallery />
      <AdminVenuePage />
    </div>
  );
};

export default AdminPanel;