import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import Onboard from "@/../public/assets/onboarding/OnbordingImg.svg";
import Logout from "@/../public/assets/onboarding/Logout.svg";
// import Company from "@/../public/assets/onboarding/company.svg";
import Profile from "@/../public/assets/onboarding/userIcon.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "@/redux/slices/Onboardingpersdetails";
import {
  setCompanyData,
  setPersonalData,
  updateOrganization,
  updateEmployee,
  setCompanyStatus,
  setPersonalStatus,
} from "@/redux/slices/Onboardingpersdetails";
import { removeAccessToken } from "@/utils/getAccessToken";




import {  Progress,notification  } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";

const PreviewEmp = ({ setInStep, inStep, step, setStep }) => {
  const personalData = useSelector(
    (state) => state.Onboardingpersdetails.personalData
  );
  const companyData = useSelector(
    (state) => state.Onboardingpersdetails.companyData
  );
  const employeId = useSelector(
    (state) => state.Onboardingpersdetails.employeId
  );

  // const personalStatus = useSelector(
  //   (state) => state.Onboardingpersdetails.personalStatus
  // );
  // const companyStatus = useSelector(
  //   (state) => state.Onboardingpersdetails.companyStatus
  // );

  const router = useRouter();
  const dispatch = useDispatch();

  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   // console.log("company...", companyData);

  //      const combinedData = {"482d8374-fca3-43ff-a638-02c8a425c492",...companyData, };

  //      dispatch(createUser(personalData))
  //      dispatch(createCompany(combinedData))
  //     //  console.log(combinedData);

  // };


  const handleUpdateEmployee = async (data) => {
    try {
      const response = await updateEmployee(dispatch, employeId, data);
      console.log("PU -- ",response);
      //  if(response) {
      //   // dispatch(setPersonalStatus());
      //   setPersonalStatus(true)
      // }
      return response ? true : false;
      // Set other state as needed
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
      return false;
    }
  };

  const handleUpdateOrganization = async (data) => {
    try {
      const response = await updateOrganization(dispatch, data);
      console.log('UO -- ',response);
      // if(response?.id) {
      //   // dispatch(setCompanyStatus());
      //   setCompanyStatus(true)
      // }
      return response ? true : false;
      // Set other state as needed
    } catch (error) {
      console.error(error);
      // Handle error
      return false;
    }
  };

  const openNotification = () => {
    notification.open({
      message: "Something went wrong, please try again",
    });
  };

  


  const handleSubmit = async () => {
    // const orgId = "482d8374-fca3-43ff-a638-02c8a425c492"; // Replace with your actual orgId value
    console.log("id for the employe", employeId);
    // Combine orgId with companyData
    // const personalDatawithID = { id:employeId, ...personalData };

    // Dispatch actions with the modified data
    // dispatch(createUser(personalData));
    // dispatch(createCompany(companyData));
   

   const personalstatus = await handleUpdateEmployee(personalData);
   const companystatus = await handleUpdateOrganization(companyData);


    // console.log("redux status p",personalStatus);
    // console.log("redux status c",companyStatus);
  

    // if(personalStatus == 200 && companyStatus == 200)
    if(personalstatus && companystatus)
    {
      // setStep(step + 1)
      router.push("/hrms")

    }
    else{
      // setStep(1)
      console.log("error");

      openNotification()
    }

 
    // console.log(combinedData);
    
  };

  const datetoshow = moment(personalData.dob).format("DD/MM/YYYY");
  // console.log(personalData.name);

  return (
    <div className="flex justify-center items-center gap-16 w-[100%] h-[100vh] p-10 ">
      <div className="md:w-[70vw] h-[88vh] rounded-2xl bg-[#E6F7FF] flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={Onboard}
          className="w-[60%]  "
          alt="onboard"
        />
      </div>
      <div className="flex flex-col gap-5 items-center  w-[50vw] h-[85vh] relative">
        <Link
          href="/login"
          onClick={() => {
            removeAccessToken();
          }}
        >
          <div
            className="flex  items-center p-1 gap-1 border border-[#1890FF] text-black group btn hover:bg-white transition w-[100px] absolute rounded-sm
         right-2 -top-5 cursor-pointer"
          >
            <Image
              width={15}
              height={15}
              src={Logout}
              className="group-hover:bg-white"
              alt="logout"
            />
            <button className="">Logout</button>
          </div>
        </Link>
        <div className="w-full h-full flex flex-col gap-5 ">
          <div className="w-full  flex flex-col">
            <span
              className="flex items-center gap-2 hover:scale-105 transition-all cursor-pointer mt-2 "
              onClick={() => {
                setStep(step - 1);
              }}
            >
              <IoChevronBackOutline />
              <p>Back</p>
            </span>
            <p className="text-sm text-gray-400">Onboarding</p>
            <Progress percent={86} showInfo={false} />
            <span className="text-[#4F7396] text-sm -mb-2 ">step 3 of 3</span>
          </div>
          <h2 className="text-xl font-bold -mb-3">Preview</h2>
          <div className="flex gap-8 ">
            <div className=" border-b-2 border-[#1890FF] text-[#1890FF] font-medium cursor-pointer hover:scale-105 transition-all">
              Personal Details
            </div>
            <div
              className="border-b-2 border-black  font-medium cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setInStep(inStep + 1);
              }}
            >
              Company Details
            </div>
          </div>
        </div>
        <div className="self-start rounded-md w-full p-2 h-full flex flex-col gap-10">
          <Image
            src={personalData.image || Profile}
            width={100}
            height={100}
            alt="profile"
          />
          <div className="flex flex-col gap-2">
            <div className="flex  justify-start gap-40 border-b-2 -mt-2  border-gray-200 w-full">
              <span className="  flex flex-col gap-1 text-sm">
                <span className="text-gray-400 ">First Name</span>
                <span>{personalData.first_name}</span>
              </span>
              <span className="flex flex-col gap-1 pl-4 text-sm">
                <span className="text-gray-400 ">Last Name</span>
                <span>{personalData.last_name}</span>
              </span>
            </div>
            <div className="flex flex-col gap-1  border-b-2 border-gray-200 w-full text-sm">
              <span className="text-gray-400 ">Gender</span>
              <span>{personalData.gender}</span>
            </div>
            <div className="flex flex-col gap-1  border-b-2 border-gray-200 w-full text-sm">
              <span className="text-gray-400 ">Phone Number</span>
              <span>+91 {personalData.number}</span>
            </div>
            <div className="flex flex-col gap-1  border-b-2 border-gray-200 w-full text-sm">
              <span className="text-gray-400 "> Date of Birth</span>
              <span>{datetoshow}</span>
            </div>
          </div>
        </div>
        <button
          className="w-[70%] lg:mt py-1 h-8 bg-[#1890FF] border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] transition-all text-white items-end"
          onClick={
            handleSubmit
            // ,setStep(step + 1)
          }
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default PreviewEmp;
