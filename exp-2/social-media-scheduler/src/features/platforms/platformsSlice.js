import { createSlice } from "@reduxjs/toolkit";

const platformsSlice = createSlice({
  name: "platforms",

  initialState: {
    platforms: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn"
    ],
  },

  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },
  },
});

export const { addPlatform } = platformsSlice.actions;

export default platformsSlice.reducer;