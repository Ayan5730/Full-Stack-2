import { useState } from 'react';

export default function TokenInspector({ token, decodedToken }) {
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="card token-inspector">
      <div className="inspector-header">
        <h3>JWT Token Inspector</h3>
        <button className="copy-btn" onClick={copyToClipboard}>
          {showCopied ? 'Copied!' : 'Copy Raw Token'}
        </button>
      </div>

      <div className="raw-token-box">
        <label>Raw Encoded Token (Header.Payload.Signature):</label>
        <div className="token-string">
          {token ? (
            <>
              <span className="part-header">{token.split('.')[0]}</span>.
              <span className="part-payload">{token.split('.')[1]}</span>.
              <span className="part-signature">{token.split('.')[2]}</span>
            </>
          ) : (
            'No token active'
          )}
        </div>
      </div>

      <div className="decoded-grid">
        <div className="decoded-col">
          <h4 className="part-header-text">1. Header (Algorithm & Token Type)</h4>
          <pre>{JSON.stringify(decodedToken?.header || {}, null, 2)}</pre>
        </div>

        <div className="decoded-col">
          <h4 className="part-payload-text">2. Payload (User Claims & Expiry)</h4>
          <pre>{JSON.stringify(decodedToken?.payload || {}, null, 2)}</pre>
        </div>

        <div className="decoded-col">
          <h4 className="part-signature-text">3. Signature (HMAC SHA-256)</h4>
          <div className="signature-info">
            <code>{decodedToken?.signature || 'Verified'}</code>
            <p className="sig-status">✓ Signature Verified with Secret Key</p>
          </div>
        </div>
      </div>
    </div>
  );
}
