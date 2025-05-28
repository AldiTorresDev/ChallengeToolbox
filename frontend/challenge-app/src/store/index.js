import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./filesSlice";
import fileNamesReducer from "./fileNamesSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    fileNames: fileNamesReducer,
  },
});

