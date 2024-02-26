
import { createSlice } from '@reduxjs/toolkit';

const EquipmentDetails = createSlice({
  name: 'EquipmentDetails',
  initialState: {
    EquipmentData: {
      devicetype: '',
      manufacturerName: '',
      serialnumber: '',
      notes: '',
      supplyDate: '',
    },
  },
  reducers: {
    addFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { addFormData } = EquipmentDetails.actions;
export const selectFormData = (state) => state.EquipmentDetails.EquipmentData;
export default EquipmentDetails.reducer;