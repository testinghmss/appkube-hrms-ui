"use client";
import { createSlice } from "@reduxjs/toolkit"
const EquipmentDetails = createSlice({
    name: "EquipmentDetails",
    initialState: {
        Device: {},
        equipment: [{
            Owner:true,
            DeviceType: '',
            ManufacturerName: '',
            SerialNumber: '',
            Notes: '',
            SupplyDate: ''
        }],


    },



    reducers: {
        AddEquipment: (state, action) => {
            const {Owner,DeviceType, ManufacturerName, SerialNumber, Notes, SupplyDate } = action.payload;
            
            // Update specific properties in the first item of the equipment array
            state.equipment[0].Owner = Owner;
            state.equipment[0].DeviceType = DeviceType;
            state.equipment[0].ManufacturerName = ManufacturerName;
            state.equipment[0].SerialNumber = SerialNumber;
            state.equipment[0].Notes = Notes;
            state.equipment[0].SupplyDate = SupplyDate;

        },


    }
})

export const { AddEquipment } = EquipmentDetails.actions;
export default EquipmentDetails.reducer;