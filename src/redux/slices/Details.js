import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalDetails: [], 
    professionalDetails: [], 
    equipDetails: [], 
    documentDetails: [], 
  };
export const formSlice = createSlice({
  name: "Details",
  initialState,
  reducers: {
    setpersonalDetails: (state, action) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
    setprofessionalDetails: (state, action) => {
      state.professionalDetails = { ...state.professionalDetails, ...action.payload };
    },
    setequipmentDetails: (state, action) => {
      state.equipDetails = { ...state.equipDetails, ...action.payload };
    },
    setdocumentDetails: (state, action) => {
      state.documentDetails = { ...state.documentDetails, ...action.payload };
    },
  },
});

export const { setpersonalDetails} = formSlice.actions;
export const { setprofessionalDetails} = formSlice.actions;
export const { setequipDetails} = formSlice.actions;
export const {setdocumentDetails} = formSlice.actions;


export default formSlice.reducer;