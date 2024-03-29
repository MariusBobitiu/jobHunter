import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { darkModeSlice } from "./features/darkMode/darkModeSlice";
import { jobsSlice } from "./features/jobs/jobsSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const jobsPersistConfig = {
  key: "jobs",
  storage,
  whitelist: ["jobs"],
};

const userPersistedReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);
const jobsPersistedReducer = persistReducer(
  jobsPersistConfig,
  jobsSlice.reducer
);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    darkMode: darkModeSlice.reducer,
    jobs: jobsPersistedReducer,
  },
});

export const persistor = persistStore(store);
