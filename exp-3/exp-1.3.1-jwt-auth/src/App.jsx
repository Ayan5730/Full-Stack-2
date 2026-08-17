import { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import CalendarView from './components/CalendarView';
import ComposeView from './components/ComposeView';
import { 
  createJWT, 
  decodeJWT, 
  verifyJWT, 
  saveStoredToken, 
  getStoredToken, 
  removeStoredToken 
} from './utils/jwt';
import './App.css';

export default function App() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics'); // matches Image 2 default view
  const [loading, setLoading] = useState(true);

  // Initialize and restore session statelessly from localStorage
  useEffect(() => {
    const existingToken = getStoredToken();
    if (existingToken) {
      const verification = verifyJWT(existingToken);
      if (verification.valid) {
        setToken(existingToken);
        setDecodedToken(verification.decoded);
      } else {
        // Token expired or tampered, clear stored token
        removeStoredToken();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (username, password) => {
    // Generate JWT statelessly
    const newToken = createJWT({ username });
    saveStoredToken(newToken);

    const decoded = decodeJWT(newToken);
    setToken(newToken);
    setDecodedToken(decoded);
    setActiveTab('analytics'); // navigate to Analytics as shown in Image 2
  };

  const handleLogout = () => {
    removeStoredToken();
    setToken(null);
    setDecodedToken(null);
  };

  if (loading) {
    return <div className="loading-screen">Loading Session...</div>;
  }

  // Unauthenticated view - Login card (Image 1)
  if (!token || !decodedToken) {
    return <Login onLogin={handleLogin} />;
  }

  // Authenticated view - Layout with Sidebar & Main Content (Image 2)
  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="main-content">
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={decodedToken?.payload} 
            token={token} 
            decodedToken={decodedToken} 
          />
        )}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'compose' && <ComposeView />}
      </main>
    </div>
  );
}
