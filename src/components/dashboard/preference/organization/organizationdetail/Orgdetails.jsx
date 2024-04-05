"use client";
import React, { useEffect, useState } from "react";
// import { Button } from "antd";
import Image from "next/image";
import Company from "@/../../public/assets/onboarding/company.svg";
// import { useRouter } from "next/navigation";
// import { PiPencilSimpleLineFill } from "react-icons/pi";
import { AiFillEdit } from "react-icons/ai";
// import { Button } from "antd";
// import { IoSaveSharp } from "react-icons/io5";
import Editorgdetails from "./Editorgdetails";
import {useSelector} from "react-redux"
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from '@/api/axios'


const Orgdetails = () => {
  const [edit, setEdit] = useState(false);
  const companyData = useSelector((state) => state.Onboardingpersdetails.companyData);
  const [isClient, setIsClient] = useState(false);
  const [fetchedData , setFetchData] = useState([])
  const accessToken = getAccessTokenFromCookie();
  useEffect(() => {
    // Check if both name and url are truthy
    setIsClient(true);
  },[])
  useEffect(()=>{
    console.log('in useffect')
    if( isClient){
      // const searchParams = useSearchParams();
      // const userId =  searchParams.get('id')
      const hrId = localStorage.getItem('hrId'); 
      console.log('Hr id from  localstorage',hrId)
      const fetchData = async ()=>{
        // setEmpId(id)
        try{
          // const id = await localStorage.getItem('empId')
          // console.log('employee id from local storage',userId)
          const response = await axios.get(`/employee/${hrId}`,{
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log("response of employee data for overview",response.data)
          setFetchData(response.data.organization_details);
          // console.log("data",employees)
        }
        catch(error){
          console.log('error fetching employee data',error);
        }
      }
      fetchData()
    }
  },[setFetchData,accessToken,isClient])
  
  console.log('fetched hr data',fetchedData)

  
  // "organization_details": {
  //   "org_id": "482d8374-fca3-43ff-a638-02c8a425c492",
  //   "org_name": "Gandhe",
  //   "org_logo": "",
  //   "org_address_line_1": "123 Main St",
  //   "org_address_line_2": "Apt 101",
  //   "org_contact": 1890,
  //   "org_country": "USA",
  //   "org_city": "San Francisco",
  //   "org_state": "California",
  //   "org_Zipcode": 1233445
  // },

  return (
    <>
      {!edit ? (
        <div className="flex gap-3 relative p-2">
          <button
            className="bg-blue-500 text-white flex gap-2 items-center rounded-sm border hover:text-blue-500 hover:bg-white hover:border-blue-500 transition-all absolute right-2 top-2 p-1 px-3"
            onClick={() => {
              setEdit(true);
            }}
          >
            <AiFillEdit className="text-lg" /> Edit
          </button>
          <div className="w-full  flex items-start justify-start shadow-md gap-20 px-4 py-2">
            <div className="h-24 w-24 rounded-full border bg-gray-300">
              <Image
                alt="company logo"
                src={(fetchedData.org_logo)? (fetchedData.org_logo) : (Company)}
                className="h-full w-full rounded-full"
                width={100}
                height={100}
              />
            </div>
            <div className="w-[40%] flex flex-col gap-5 leading-8">
              <div className="flex  justify-between  border-1 border-b  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 ">Legal Company Name</span>
                  <span>{fetchedData.org_name}</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Company Email Address</span>
                  <span>{fetchedData?.email}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 items-start w-[50%]">
                  <span className="text-gray-400 ">Contact Number</span>
                  <span>+91{fetchedData.org_contact }</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Address Line 1</span>
                  <span>{fetchedData.org_address_line_1}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 "> Address Line 2</span>
                  <span>{fetchedData.org_address_line_1}</span>
                </span>
                <span className="flex flex-col items-start gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Country</span>
                  <span>{fetchedData.org_country}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 ">State</span>
                  <span>{fetchedData.org_state}</span>
                </span>
                <span className="flex flex-col items-start gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">City</span>
                  <span>{fetchedData.org_city}</span>
                </span>
              </div>
              <div className="flex   border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%] border-b border-1 ">
                  <span className="text-gray-400 ">Zipcode</span>
                  <span>{fetchedData.org_zipcode}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Editorgdetails hrData={fetchedData}/>
      )}
    </>
  );
};

export default Orgdetails;