// any store// any store
"use client";
import { configureStore } from "@reduxjs/toolkit";
import professionalDetails from "../slices/profDetails";
import personalDetails from "../slices/personalDetails";
import Onboardingpersdetails from "../slices/Onboardingpersdetails";
import EquipmentDetails from "../slices/Equipment";

export const store = configureStore({
  reducer: {
    professionalDetails: professionalDetails,
    personalDetails: personalDetails,
    Onboardingpersdetails: Onboardingpersdetails,
    EquipmentDetails: EquipmentDetails,
  },
});
