import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  id: "",
  name: "",
  email: "",
  email_verified_at:null,
  created_at: null,
  updated_at: null,
};

export const logout = createAsyncThunk('profile/logout', async (_, { dispatch }) => {
  try {
    const res = await api.post("/api/auth/logout", {});
    alert(res.data.message);
    localStorage.removeItem("accessToken");
    dispatch(profileReducer.actions.resetProfile());
  } catch (e) {
    console.error(e);
  }
});

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
