import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  email_verified_at:null,
  created_at: null,
  updated_at: null,
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetProfile: () => initialState,
  },
});

