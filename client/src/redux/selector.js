import { createSelector } from "@reduxjs/toolkit";

const profileSelector = (state) => {
  return state.profile;
};

export const profile = createSelector(profileSelector, (profile) => {
  return profile;
});
