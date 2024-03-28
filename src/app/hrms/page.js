"use client";
import { Table } from "antd";
//import React from "react";
import React, { useEffect,useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios";
// import Plus from "../../../public/assets/homeicons/Union.svg";

import AccountImg from "../../../public/assets/homeicons/EmployeesImg/AccountImg.svg";
import Person from "../../../public/assets/homeicons/EmployeesImg/Account.svg";
import Circle from "../../../public/assets/homeicons/EmployeesImg/circle.svg";
import { FiPlus } from "react-icons/fi";
const page = () => {
  const accessToken = getAccessTokenFromCookie();
  const [empData,setEmpData]=useState([])
  const fetchData = async ()=>{
    try{
      console.log('fetching')
      const response = await axios.get("/dashboard/dashboardStats", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('dashboard data',response)
      setEmpData(response.data)
      console.log("employee data fetched",empData)
    }
    catch(error){
      console.log('error of dashboard',error)
    }

  }
  useEffect(()=>{
    fetchData();
    console.log('in use effect')
  },[])


  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      
    },
    {
      title: "Employee ID",
      dataIndex: "empId",
      sorter: {
        compare: (a, b) => a.empId - b.empId,
        multiple: 3,
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 2,
      },
    },
    {
      title: "Designation",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Employee type",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Start Date",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];



  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="">
      {/* <header className='text-black w-full flex justify-center items-start'>
        Dashboard
       </header> */}
      <div className="w-full  px-4 py-3 bg-[#E6F7FF] pb-5 ">
        <h2>Dashboard</h2>

        <div className="flex gap-4 justify-center items-center">
          <div className="flex w-full py-6">
            <Image src={AccountImg} className="" alt="acount image" />
            <div className=" flex flex-col pl-4">
              <h1 className="text-2xl"> Welcome Ajay! </h1>
              <h1 className="text-2xl">Have a nice day!</h1>
            </div>
          </div>

          <div className="flex w-full bg-white p-6 gap-4 border rounded-xl ">
            <Image src={Person} alt="person"/>
            <div>
              <h2>Total Employees</h2>
              <h3 className="text-2xl"></h3>
            </div>
          </div>

          <div className="flex w-full bg-white p-6 gap-4  border rounded-2xl ">
            <Image src={Circle} alt="circle"/>
            <div>
              <h2>Total Projects</h2>
              <h3 className="text-2xl">{empData.Totalemployees}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <h2>Employees</h2>
        <Link href={"/hrms/employees/addemp"}>
          <button className="bg-[#1890FF] text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] flex p-4 gap-3 justify-center items-center">
             <FiPlus />
             Add New Employees
          </button>
        </Link>
      </div>
      <Table columns={columns} onChange={onChange} />
    </div>
  );
};

export default page;
