import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalDetails: [],
  professionalDetails: [],
  equipDetails: [],
  documentDetails: [],
  ParticularempId:{},
  id: "",
  tab: false
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
    setParticularEmpid:(state, action)=>{
      state.ParticularempId= action.payload
    },
    setId: (state, action) => {
      state.id = action.payload
      console.log("id", action.payload)
    },
    setTabs: (state, action) => {
      state.tab = action.payload
      console.log("setTab", action.payload)
    }
  },
});

export const { setpersonalDetails } = formSlice.actions;
export const { setprofessionalDetails } = formSlice.actions;
export const { setequipDetails } = formSlice.actions;
export const { setdocumentDetails } = formSlice.actions;
export const {setParticularEmpid} = DetailSlice.actions;
export const { setId } = formSlice.actions;
export const { setTabs } = formSlice.actions;

export default formSlice.reducer;
