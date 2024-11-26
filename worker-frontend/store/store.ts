// store.ts
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice"; // Adjust the import as necessary

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export default store;
