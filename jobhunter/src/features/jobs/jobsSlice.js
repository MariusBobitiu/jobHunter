import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getJobsStart: (state) => {
      state.status = "loading";
    },
    getJobsSuccess: (state, action) => {
      state.status = "succeeded";
      state.jobs = action.payload;
    },
    getJobsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { getJobsStart, getJobsSuccess, getJobsFailure } =
  jobsSlice.actions;
