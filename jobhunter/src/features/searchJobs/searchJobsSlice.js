import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchJobs: [],
  totalJobs: 0,
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
    getTotalJobs: (state, action) => {
      state.totalJobs = action.payload;
    },
  },
});

export const {
  getSearchJobsStart,
  getSearchJobsSuccess,
  getSearchJobsFailure,
  setSearchJobsLogout,
  getTotalJobs,
} = searchJobsSlice.actions;
