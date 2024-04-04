// any store// any store
"use client";
import { configureStore } from "@reduxjs/toolkit";
// import professionalDetails from "../slices/profDetails";
// import personalDetails from "../slices/personalDetails";
import SendpersonalDetails from "../slices/SendpersonalDetails";
import Onboardingpersdetails from "../slices/Onboardingpersdetails";
import EquipmentDetails from "../slices/Equipment";
import Equipment from "../slices/Equipment";
import formSlice from "../slices/Details";
import resetPasswordSlice from "../slices/resetPasswordSlice";
// import Details from "../slices/Details";
import Details from "../slices/Details";
import organizationSetupReducer, { setDesignations, setDepartments } from "../slices/organizationSetupSlice";

export const store = configureStore({
  reducer: {
    // professionalDetails: professionalDetails,
    formDetails: formSlice,
    // personalDetails: personalDetails,
    resetPassword: resetPasswordSlice,
    Onboardingpersdetails: Onboardingpersdetails,
    EquipmentDetails: EquipmentDetails,
    Details:Details,
    organizationSetup: organizationSetupReducer,
  },
});