import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/ProfileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer.reducer,
  },
});

export default store;
