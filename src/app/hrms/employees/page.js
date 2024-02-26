"use client";
import React ,{useState,useEffect} from "react";
import { Table, Breadcrumb } from "antd";
import Image from "next/image";
import Link from "next/link";
import Plus from "../../../../public/assets/homeicons/Union.svg";
import { useRouter } from "next/navigation";
import Avatar from "@/../public/assets/empDetails/Avatar1.svg";
// import axios from 'axios'
import axios from "@/api/axios"

const page = () => {
  const router = useRouter();
  const columns = [
    // {
    //   title: "Photo",
    //   dataIndex: "photo",
    // },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
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
      dataIndex: "designation",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Employee type",
      dataIndex: "employee_type",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
 const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    router.push("/hrms/employees/employeesOverView");
  };


 const [employees, setEmployees] = useState([])
  


  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const values = await axios.get('/employee?page=1');
        console.log("response",values.data.employees)
        setEmployees(values.data.employees);
        // console.log("data",employees)

      }
      catch(error){
        console.log('error',error);
      }
    }
    fetchData()
  },[])
 
  const stylestable = {
    width: "100%",
    borderCollapse: "collapse",
    padding: "0",
  }
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
        <Link href={"/hrms/employees/addemp"}>
          <button className="bg-[#1890FF] hover:bg-blue-600 text-white flex p-4 gap-3 justify-center items-center">
            {" "}
            <Image src={Plus} /> Add New Employees{" "}
          </button>
        </Link>
      </div>
       <Link href={`/hrms/employees/employeesOverView`}> 
       <Table className="!m-1 !p-0"  columns={columns} dataSource={employees} style={stylestable}
  rowClassName="table-row"
  onChange={onChange} /> 

       </Link>
      {/* <ul>
        {(employees.length > 0) ? (employees.map((emp)=>{
          return <li key={emp.employee_id}>{emp.employee_name}</li>
        })): (<li>loading</li>)}
      </ul> */}
      {/* <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Id</th>
            <th>Project</th>
            <th>Email Address</th>
            <th>Designation</th>
            <th>Employee Type</th>
            <th>Department</th>
            <th>Start Date</th>
          </tr>
          <tbody>
            {(employees.length > 0) ? (employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>{emp.employee_name}</td>
                <td>{emp.employee_id}</td>
                <td>appkube</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.employee_type}</td>
                <td>{emp.department}</td>
                <td>{emp.start_date}</td>
              </tr>
            ))) : (<h2>...Loading</h2>)}
          </tbody>
        </thead>
      </table>
       */}
    </div>
  );
};


export default page;
