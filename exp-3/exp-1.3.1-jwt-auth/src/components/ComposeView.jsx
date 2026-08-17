import { useState } from 'react';

export default function ComposeView() {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!postTitle || !content) return;
    setStatus('Post created successfully! Authorization Header attached: [Bearer <JWT>]');
    setTimeout(() => {
      setPostTitle('');
      setContent('');
      setStatus('');
    }, 3000);
  };

  return (
    <div className="compose-container">
      <h1 className="content-title">Compose</h1>
      <div className="card compose-card">
        <h3>Create New Post (Authenticated Endpoint)</h3>
        {status && <div className="success-banner">{status}</div>}
        <form onSubmit={handlePublish} className="compose-form">
          <div className="form-group">
            <label>Post Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="compose-input"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              rows="5"
              placeholder="Write post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="compose-textarea"
            />
          </div>
          <button type="submit" className="publish-btn">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
