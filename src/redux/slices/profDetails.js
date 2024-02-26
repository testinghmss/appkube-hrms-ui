// any slice

'use client'
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'professionalDetails',
  initialState: {
    designation_id: null,
    pf: '',
    uan: '',
    department_id: null,
    reporting_manager_id:'',
    work_location:'', 
        
  },
  reducers: {
    updateProfessionalDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    setDropdownOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { updateProfessionalDetails, setDropdownOption } = slice.actions;

export const selectProfessionalDetails = (state) => state.professionalDetails;

export default slice.reducer;