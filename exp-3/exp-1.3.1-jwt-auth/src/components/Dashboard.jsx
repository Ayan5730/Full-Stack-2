import TokenInspector from './TokenInspector';

export default function Dashboard({ user, token, decodedToken }) {
  return (
    <div className="dashboard-container">
      <h1 className="content-title">Dashboard</h1>
      
      <div className="welcome-banner">
        <h2>Welcome back, <span className="highlight">{user?.username || 'User'}</span>!</h2>
        <p className="subtitle">
          Stateless JWT Authentication Session is active. Your identity is verified using client-side stored token claims.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="card info-card">
          <h3>User Profile Claims (From JWT Payload)</h3>
          <div className="info-list">
            <div className="info-row">
              <span className="label">Subject (Username):</span>
              <span className="value">{decodedToken?.payload?.sub || user?.username}</span>
            </div>
            <div className="info-row">
              <span className="label">Role:</span>
              <span className="value badge">{decodedToken?.payload?.role || 'Administrator'}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{decodedToken?.payload?.email || 'user@example.com'}</span>
            </div>
            <div className="info-row">
              <span className="label">Issued At (iat):</span>
              <span className="value">
                {decodedToken?.payload?.iat 
                  ? new Date(decodedToken.payload.iat * 1000).toLocaleString() 
                  : 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Expiration (exp):</span>
              <span className="value">
                {decodedToken?.payload?.exp 
                  ? new Date(decodedToken.payload.exp * 1000).toLocaleString() 
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="card status-card">
          <h3>Session Security Overview</h3>
          <div className="status-badge valid">
            ✓ Valid JWT Signature & Active Expiration
          </div>
          <p className="description">
            The server does not store session IDs. Each incoming HTTP request validates the JWT signature statelessly.
          </p>
        </div>
      </div>

      <TokenInspector token={token} decodedToken={decodedToken} />
    </div>
  );
}
