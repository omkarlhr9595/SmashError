import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  token: null,
}
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
export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
