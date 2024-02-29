"use client";
import React, { useState, useEffect } from "react";
import {  Breadcrumb } from "antd";

import { useRouter } from "next/navigation";

// import axios from 'axios'
import axios from "@/api/axios";
export const SendEmp = (emp) => {
  if(emp===undefined){
    console.log('')
  }
    console.log(emp);
  
};
const page = () => {
  const router = useRouter();
  const AddEmployees = ()=>{

    router.push('/hrms/employees/addemp')
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    router.push("/hrms/employees/employeesOverView");
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = await axios.get("/employee/tracker");
        console.log("response tracker", values);
        setEmployees(values.data.employees);
        // console.log("data",employees)
      } catch (error) {
        console.log("error tracker", error);
      }
    };
    fetchData();
  }, []);

  const stylestable = {
    width: "100%",
    borderCollapse: "collapse",
    padding: "0",
  };
  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb
            items={[
              {
                title: "Dashboard",
              },
              {
                title: <a href="">Employees</a>,
              },
            ]}
          />
          <h2 className="text-xl font-semibold">All Employees</h2>
        </div>
        
          {/* <button onClick={AddEmployees} className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center">
            <FiPlus /> Add New Employees
          </button> */}
       
      </div>
      {employees.length > 0 ? (
        <table className="leading-10 gap-5">
          <thead>
            <tr>
              <th>Employee Name</th>
              {/* <th>Project</th> */}
              <th>Email Address</th>
              <th>Employee Status</th>
              <th>Designation</th>
              <th>Employee Type</th>
              {/* <th>image</th> */}
              {/* <th>Start Date</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                onClick={() => {
                  SendEmp(emp);
                }}
                className="!p-10 "
              >
                <td>{emp.employee_name}</td>
                {/* <td>appkube</td> */}
                <td>{emp.email}</td>
                <td>{emp.employee_status}</td>
                <td>{emp.designation}</td>
                <td>{emp.employee_type}</td>
                {/* <td>{emp.image}</td> */}
                {/* <td>{emp.start_date}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>...Loading or Empty State Message</h2>
      )}
    </div>
  );
};

export default page;
