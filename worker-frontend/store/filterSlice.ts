// filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  driverLicenses: string[];
  placeOfWork: string[];
  drivingExperience: string[];
  yearsOfExperience: { start: number | null; end: number | null };
  expectedSalary: { start: number | null; end: number | null };
}

const initialState: FilterState = {
  driverLicenses: [],
  placeOfWork: [],
  drivingExperience: [],
  yearsOfExperience: { start: null, end: null },
  expectedSalary: { start: null, end: null },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setDriverLicenses(state, action: PayloadAction<string>) {
      const index = state.driverLicenses.indexOf(action.payload);
      if (index > -1) {
        state.driverLicenses.splice(index, 1); // Remove if already selected
      } else {
        state.driverLicenses.push(action.payload); // Add if not selected
      }
    },
    setPlaceOfWork(state, action: PayloadAction<string>) {
      const index = state.placeOfWork.indexOf(action.payload);
      if (index > -1) {
        state.placeOfWork.splice(index, 1); // Remove if already selected
      } else {
        state.placeOfWork.push(action.payload); // Add if not selected
      }
    },
    setDrivingExperience(state, action: PayloadAction<string>) {
      const index = state.drivingExperience.indexOf(action.payload);
      if (index > -1) {
        state.drivingExperience.splice(index, 1); // Remove if already selected
      } else {
        state.drivingExperience.push(action.payload); // Add if not selected
      }
    },
    setYearsOfExperienceStart(state, action: PayloadAction<number>) {
      state.yearsOfExperience.start = action.payload;
    },
    setYearsOfExperienceEnd(state, action: PayloadAction<number>) {
      state.yearsOfExperience.end = action.payload;
    },
    setExpectedSalaryStart(state, action: PayloadAction<number>) {
      state.expectedSalary.start = action.payload;
    },
    setExpectedSalaryEnd(state, action: PayloadAction<number>) {
      state.expectedSalary.end = action.payload;
    },
  },
});

export const {
  setDriverLicenses,
  setPlaceOfWork,
  setDrivingExperience,
  setYearsOfExperienceStart,
  setYearsOfExperienceEnd,
  setExpectedSalaryStart,
  setExpectedSalaryEnd,
} = filterSlice.actions;

export default filterSlice.reducer;
