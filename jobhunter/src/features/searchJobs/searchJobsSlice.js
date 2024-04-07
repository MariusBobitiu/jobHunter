import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchJobs: [],
  status: "idle",
  error: null,
};

export const searchJobsSlice = createSlice({
  name: "searchJobs",
  initialState,
  reducers: {
    getSearchJobsStart: (state) => {
      state.status = "loading";
    },
    getSearchJobsSuccess: (state, action) => {
      state.status = "success";
      state.searchJobs = action.payload;
    },
    getSearchJobsFailure: (state, action) => {
      state.status = "fail";
      state.error = action.payload;
    },
    setSearchJobsLogout: (state) => {
      state.searchJobs = [];
    },
  },
});

export const {
  getSearchJobsStart,
  getSearchJobsSuccess,
  getSearchJobsFailure,
  setSearchJobsLogout,
} = searchJobsSlice.actions;
