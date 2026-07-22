import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../../services/api";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async () => {
    const data = await fetchPosts();
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    status: "idle",
  },

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (p) => p.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;