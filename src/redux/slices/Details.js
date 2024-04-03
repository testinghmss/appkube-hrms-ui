import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalDetails: {}, 
    professionalDetails: {}, 
    equipDetails: [], 
    documentDetails: [], 
  };
export const DetailSlice = createSlice({
  name: "Details",
  
  initialState,
  reducers: {
    setpersonalDetails: (state, action) => {
      // state.personalDetails = { ...state.personalDetails, ...action.payload };
      state.personalDetails = action.payload
      console.log('added personal data in redux',action.payload)
    },
    setprofessionalDetails: (state, action) => {
      // state.professionalDetails = { ...state.professionalDetails, ...action.payload };
      state.professionalDetails = action.payload
      console.log('added professional data in redux',action.payload)
    },
    setEquipmentDetails: (state, action) => {
      // state.equipDetails = { ...state.equipDetails, ...action.payload };
      state.equipDetails.push(action.payload[0])
      console.log('storing data of equipments in redux',action.payload[0])
    },
    setDocumentDetails: (state, action) => {
      state.documentDetails = action.payload 
    },
  },
});

export const { setpersonalDetails} = DetailSlice.actions;
export const { setprofessionalDetails} = DetailSlice.actions;
export const { setEquipmentDetails} = DetailSlice.actions;
export const {setDocumentDetails} = DetailSlice.actions;


export default DetailSlice.reducer;
