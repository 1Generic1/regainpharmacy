import { Outlet } from 'react-router-dom'; 
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <AdminTopbar />
        <div className="adminmain-content">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

