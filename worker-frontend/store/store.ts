import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice"; // Import your filter slice reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    filter: filterReducer, // Your filter reducer
  },
});

// Define RootState based on the store
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch type to use in your custom hooks
export type AppDispatch = typeof store.dispatch;

// Export the store as default (you likely already do this)
export default store;
