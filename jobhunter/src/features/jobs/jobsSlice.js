import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  sortState: { key: "id", isAsc: false },
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
    setSortState: (state, action) => {
      state.sortState = action.payload;
    },
    setJobsLogout: (state) => {
      state.jobs = [];
    },
  },
});

export const {
  getJobsStart,
  getJobsSuccess,
  getJobsFailure,
  setSortState,
  setJobsLogout,
} = jobsSlice.actions;
