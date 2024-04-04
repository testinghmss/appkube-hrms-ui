
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  designations: [],
  departments:[],
};

export const organizationSetupSlice = createSlice({
  name: "organizationSetup",
  initialState,
  reducers: {
    setDesignations: (state, action) => {
      state.designations = action.payload;
      console.log(action.payload)
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
      console.log(action.payload)
    },
  },
});

export const { setDesignations , setDepartments } = organizationSetupSlice.actions;

export default organizationSetupSlice.reducer;