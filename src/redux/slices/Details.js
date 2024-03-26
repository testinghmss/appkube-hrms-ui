import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalDetails: [], 
    professionalDetails: [], 
    equipDetails: [], 
    documentDetails: [], 
  };
export const DetailSlice = createSlice({
  name: "DetailSlice",
  initialState,
  reducers: {
    setpersonalDetails: (state, action) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
      console.log('disp[atching details',action.payload)
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

export const { setpersonalDetails, setprofessionalDetails, setequipDetails, setdocumentDetails} = DetailSlice.actions;



export default DetailSlice.reducer;