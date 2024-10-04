import './styles/AdminTopbar.css';

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
