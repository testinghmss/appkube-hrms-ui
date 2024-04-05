"use client";
// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
// import { Button } from "antd";
import Image from "next/image";
import Profile from "@/../../public/assets/onboarding/profile.svg";
// import { useRouter } from "next/navigation";
// import { PiPencilSimpleLineFill } from "react-icons/pi";
import { AiFillEdit } from "react-icons/ai";
import Editpersonaldetail from "./Editpersonaldetail";
// import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import axios from '@/api/axios'
const PersonalDetail = ({fetchedData}) => {
  // const router = useRouter();
  const [edit, setEdit] = useState(false);
  console.log('hr data',fetchedData)

  //   
// address_line_1
// : 
// "falaknuma"
// address_line_2
// : 
// "jahanuma"
// city
// : 
// "Hyderabad"
// country
// : 
// "India"
// dob
// : 
// "2024-04-03T00:00:00.000Z"
// email
// : 
// "abdullahahil153@gmail.com"
// emergency_number
// : 
// null
// emp_id
// : 
// null
// first_name
// : 
// "Md "
// gender
// : 
// "Male"
// highest_qualification
// : 
// null
// image
// : 
// ""
// landmark
// : 
// null
// last_name
// : 
// "Abdullah"
// number
// : 
// "9505934716"
// state
// : 
// "Telangana"
// work_email
// : 
// "abdullahahil7861@gmail.com"
// zipcode
// : 
// "500053"
  
const handleEdit = ()=>{
  setEdit(true)
  console.log('changing value od edit',edit)
}
// console.log(`edit value ${edit}`)
return (
    <>
      {!edit ? (
        <div key='personal-details'  className="w-full h-full p-2 flex flex-col gap-10 shadow-sm">
          <div className="flex justify-between items-center  p-3 shadow-md">
            <h2 className="text-xl font-bold">Personal Details </h2>
            <button
              className="bg-blue-500 text-white flex gap-2 items-center rounded-md p-2 px-3"
              onClick={handleEdit}
            >
              <AiFillEdit className="text-lg" /> Edit
            </button>
          </div>
          <div className="w-full flex items-start justify-start gap-20 shadow-md">
            <div className="h-24 w-24 rounded-full border">
              <Image
                src={(fetchedData?.image) ? (fetchedData?.image) : Profile}
                className="h-full w-full rounded-full"
                width={100}
                height={100}
                alt="profile"
              />
            </div>
            <div className="w-[40%] flex flex-col gap-5 leading-8">
              <div className="flex  justify-between  border-1 border-b  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 ">Fisrt Name</span>
                  <span>{fetchedData?.first_name}</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Last Name</span>
                  <span>{fetchedData?.last_name}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 "> Date of Birth</span>
                  <span>{fetchedData?.dob}</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Gender</span>
                  <span>{fetchedData?.gender}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 items-start w-[50%]">
                  <span className="text-gray-400 ">Phone Number</span>
                  <span>{fetchedData?.number}</span>
                </span>
                <span className="flex flex-col items-start gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Work Email</span>
                  <span>{fetchedData?.work_email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Editpersonaldetail key='edit-details' fetchedData={fetchedData}/>
      )}
    </>
  );
};

export default PersonalDetail;