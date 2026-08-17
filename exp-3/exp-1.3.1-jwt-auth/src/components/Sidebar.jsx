export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'compose', label: 'Compose' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>JWT AUTH</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button className="nav-btn logout-btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}
