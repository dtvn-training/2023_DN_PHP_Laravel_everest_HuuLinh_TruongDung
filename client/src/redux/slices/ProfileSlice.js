import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  id: "",
  name: "",
  email: "",
  email_verified_at: null,
  created_at: null,
  updated_at: null,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { dispatch }) => {
    const res = await api.get("/api/auth/profile");
    dispatch(profileReducer.actions.getProfile(res.data));
  }
);

export const logout = createAsyncThunk(
  "profile/logout",
  async (_, { dispatch }) => {
    await api.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(profileReducer.actions.resetProfile());
  }
);

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
  },
});
