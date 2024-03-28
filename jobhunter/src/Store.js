import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { darkModeSlice } from "./features/darkMode/darkModeSlice";
import { jobsSlice } from "./features/jobs/jobsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "darkMode", "jobs"],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedJobsReducer = persistReducer(persistConfig, jobsSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    darkMode: darkModeSlice.reducer,
    jobs: persistedJobsReducer,
  },
});

export const persistor = persistStore(store);
