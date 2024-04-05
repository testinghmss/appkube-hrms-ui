import { createSlice } from "@reduxjs/toolkit";
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useDispatch } from "react-redux";

const accessToken = getAccessTokenFromCookie();

export const updateEmployee = async (dispatch, employeId, data) => {
  try {
    const response = await axios.put(`/employee/${employeId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("personal data", response);
    console.log("personal status", response.status);
    dispatch(setPersonalStatus(response.status));
    return response.data;
  } catch (error) {
    console.error("error personal", error);
    throw error; // rethrow the error to handle it in the calling component
  }
};

export const updateOrganization = async (dispatch, data) => {
  try {
    const response = await axios.put("/organization", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("company response", response);
    console.log("personal status", response.status);
    dispatch(setPersonalStatus(response.status));
    return response.data;
  } catch (error) {
    console.error("error company", error);
    throw error; // rethrow the error to handle it in the calling component
  }
};

export const Onboardingpersdetails = createSlice({
  name: "Onboardingpersdetails",
  initialState: {
    personalData: {},
    companyData: {},
    employeId: null,
    personalStatus: null,
    companyStatus: null,
    OnboardingData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPersonalData: (state, action) => {
      state.personalData = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setemployeId: (state, action) => {
      state.employeId = action.payload;
    },
    setPersonalStatus: (state, action) => {
      state.personalStatus = 200;
    },
    setCompanyStatus: (state, action) => {
      state.companyStatus = 200;
    },
  },
});

export const {
  setPersonalData,
  setCompanyData,
  setemployeId,
  setPersonalStatus,
  setCompanyStatus,
} = Onboardingpersdetails.actions;
export default Onboardingpersdetails.reducer;
