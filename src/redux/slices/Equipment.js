"use client";
import { createSlice } from "@reduxjs/toolkit"
const EquipmentDetails = createSlice({
    name: "EquipmentDetails",
    initialState: {
        Device: {},
        "organization": [],
        "editdata": []
    },
    reducers: {

        AddEquipment: (state, action) => {
            console.log('dispatching payload of equipments',action.payload)
            // const {Owner,device_type_id, ManufacturerName, SerialNumber, Notes, SupplyDate ,...noting} = action.payload;
            // console.log('in dispatch',Owner,device_type_id,ManufacturerName,SerialNumber,Notes,SupplyDate,noting)
            // Update specific properties in the first item of the equipment array
            // state.equipment[0].Owner = Owner;
            // state.equipment[0].device_type_id = device_type_id;
            // state.equipment[0].ManufacturerName = ManufacturerName;
            // state.equipment[0].SerialNumber = SerialNumber;
            // state.equipment[0].Notes = Notes;
            // state.equipment[0].SupplyDate = SupplyDate;
            state.equipment.unshift(action.payload)
            // console.log('equipmemts',action.payload[0])

        },


    }
})

export const { AddEquipment, deleteequipement } = EquipmentDetails.actions;
export default EquipmentDetails.reducer;