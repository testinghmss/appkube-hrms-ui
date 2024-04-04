
import { createSlice } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import {useDispatch} from "react-redux"


const accessToken = getAccessTokenFromCookie();


export const updateEmployee = async (employeId, data) => {

  try {
    const response = await axios.put(`/employee/${employeId}`, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log("personal data", response);
    console.log("personal status",response.status);
    // dispatch(setPersonalData(response));
    return response.data;
  } catch (error) {
    console.error("error personal", error);
    throw error; // rethrow the error to handle it in the calling component
  }
};



export const updateOrganization = async (data) => {
  try {
    const response = await axios.put('/organization', data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log("company response", response);
    console.log("personal status",response.status);
    // dispatch(setCompanyData(response));
    return response.data;
  } catch (error) {
    console.error("error company", error);
    throw error; // rethrow the error to handle it in the calling component
  }
};

export const Onboardingpersdetails = createSlice({
  name: 'Onboardingpersdetails',
  initialState: {
    personalData:{},
    companyData:{},
    employeId:null,
    personalStatus:null,
    companyStatus:null,
    OnboardingData:null,
    loading: false,
    error: null,
  },
  reducers: {
    setPersonalData:(state,action) => {
      state.personalData = action.payload
      state.personalStatus = 200
    },
    setCompanyData:(state,action) => {
      state.companyData = action.payload
      state.companyStatus = 200
    },
    setemployeId:(state,action) => {
      state.employeId = action.payload
    },
    setPersonalStatus:(state,action) => {
      state.personalStatus = action.payload
    },
    setCompanyStatus:(state,action) => {
      state.companyStatus = action.payload
    }

  },
});

export const { setPersonalData, setCompanyData, setemployeId, setPersonalStatus, setCompanyStatus } = Onboardingpersdetails.actions;
export default Onboardingpersdetails.reducer;