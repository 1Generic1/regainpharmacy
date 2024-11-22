import './styles/AdminTopbar.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminTopbar = () => {
  return (
    <div className="admin-topbar">
      <input type="search" placeholder="Search..." />
      <div className="admin-topbar-icons">
        <i className="fas fa-bell"></i>
        <i className="fas fa-user-circle"></i>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default AdminTopbar;
