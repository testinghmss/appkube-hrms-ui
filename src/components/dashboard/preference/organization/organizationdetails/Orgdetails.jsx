"use client";
import React, { useState } from "react";
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



const Orgdetails = () => {
  const [edit, setEdit] = useState(false);
  const companyData = useSelector((state) => state.Onboardingpersdetails.companyData);


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
                // src="profile.svg"
                src={Company}
                className="h-full w-full rounded-full"
                width={100}
                height={100}
              />
            </div>
            <div className="w-[40%] flex flex-col gap-5 leading-8">
              <div className="flex  justify-between  border-1 border-b  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 ">Legal Company Name</span>
                  <span>{companyData.name}</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Company Email Address</span>
                  <span>{companyData.email}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 items-start w-[50%]">
                  <span className="text-gray-400 ">Contact Number</span>
                  <span>91+{companyData.number}</span>
                </span>
                <span className="flex flex-col gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Address Line 1</span>
                  <span>{companyData.address_line_1}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 "> Address Line 2</span>
                  <span>{companyData.address_line_1}</span>
                </span>
                <span className="flex flex-col items-start gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">Country</span>
                  <span>{companyData.country}</span>
                </span>
              </div>
              <div className="flex  justify-between border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%]">
                  <span className="text-gray-400 ">State</span>
                  <span>{companyData.state}</span>
                </span>
                <span className="flex flex-col items-start gap-1 pl-4 w-[50%]">
                  <span className="text-gray-400 ">City</span>
                  <span>{companyData.city}</span>
                </span>
              </div>
              <div className="flex   border-b border-1  border-gray-200 w-full">
                <span className="  flex flex-col gap-1 w-[50%] border-b border-1 ">
                  <span className="text-gray-400 ">Zipcode</span>
                  <span>{companyData.zipcode}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Editorgdetails />
      )}
    </>
  );
};

export default Orgdetails;