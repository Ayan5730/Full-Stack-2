import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    setError('');
    onLogin(username, password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">JWT Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="login-error">{error}</div>}
          <div className="button-container">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
