import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false; // Reset error state if needed
      state.isFetching = false; // Reset fetching state if needed
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset any previous errors
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload; // Set the current user to the newly registered user
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export default userSlice.reducer;
