import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  addPost,
  deletePost,
  loadPosts,
} from "./features/posts/postsSlice";

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!title || !content || !schedule) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        platform,
        schedule,
      })
    );

    setTitle("");
    setContent("");
    setSchedule("");
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "20px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Social Media Post Scheduler</h1>

      <h2>Create New Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {platforms.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Schedule Post
      </button>

      <hr />

      <h2>Scheduled Posts</h2>

      {status === "loading" && <h3>Loading...</h3>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <p>
            <strong>Platform:</strong> {post.platform}
          </p>

          <p>
            <strong>Date:</strong> {post.schedule}
          </p>

          <button
            onClick={() =>
              dispatch(deletePost(post.id))
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;