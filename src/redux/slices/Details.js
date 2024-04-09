import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalDetails: {}, 
    professionalDetails: {}, 
    equipDetails: [], 
    documentDetails: [], 
    documentFullDetails: [],
    ParticularempId:{}
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
    setParticularEmpid:(state, action)=>{
      state.ParticularempId= action.payload
    },
    setdocumentFullDetails: (state, action) => {
      state.documentFullDetails = action.payload
    },
    deletedocumentFullDetails: (state, action) => {
      const { payload } = action;
      state.documentFullDetails = state.documentFullDetails.filter(
        (item) => item.url == payload
      );
    }

  },
});

export const { setpersonalDetails} = DetailSlice.actions;

export const { setprofessionalDetails} = DetailSlice.actions;
export const { setEquipmentDetails} = DetailSlice.actions;
export const {setDocumentDetails} = DetailSlice.actions;
export const { setdocumentFullDetails } = DetailSlice.actions;
export const {setParticularEmpid} = DetailSlice.actions;
export const { deletedocumentFullDetails } = DetailSlice.actions;




export default DetailSlice.reducer;
