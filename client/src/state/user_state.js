import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  token: "lol",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.data = action.payload.data;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.data = null;    
      state.token = null;
    },
  },
});
