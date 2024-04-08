'use client';
import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Input, Pagination, Dropdown, Menu } from "antd";
import { FiPlus } from "react-icons/fi";
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useRouter, useNavigate } from "next/navigation";
import { DownOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setParticularEmpid } from '@/redux/slices/Details'

export const SendEmp = (emp) => {
  // if (emp === undefined) {
  //   console.log("");
  // }
  // console.log('particular emp',emp);
  console.log('emp', emp)
  return emp
};
const { Search } = Input;

const Page = () => {

  const [info, setInfo] = useState(10);
 



  const dispatch = useDispatch()

const router = useRouter();
const [selectedStatus, setSelectedStatus] = useState(null);

const AddEmployees = () => {
  router.push("/hrms/employees/addemp");
};

const [employees, setEmployees] = useState([]);
const [searchText, setSearchText] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const accessToken = getAccessTokenFromCookie();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response1 = await axios.get("/dashboard/dashboardStats", {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
              },
            });
    console.log("response of dashboard", response1.data);
    setInfo(response1.data);
      const values = await axios.get(`/employee?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response", values.data.employees);
      setEmployees(values.data.employees);
    } catch (error) {
      console.log("error", error);
    }
  };
  fetchData();
}, [accessToken]);

const filteredEmployees = employees.filter((employee) =>
  employee.employee_name.toLowerCase().includes(searchText.toLowerCase())
);

const columns = [
  {
    title: "Employee Name",
    dataIndex: "employee_name",
    key: "employee_name",
  },
  {
    title: "Employee Id",
    dataIndex: "id",
    key: "employee_id",
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
    sorter: {
      compare: (a, b) => a.email - b.email,
      multiple: 2,
    }
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
  },
  {
    title: "Employee Type",
    dataIndex: "employee_type",
    key: "employee_type",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const statusMenu = (
  <Menu>
    <Menu.Item key="All">All</Menu.Item>
    <Menu.Item key="Active">Permanent</Menu.Item>
    <Menu.Item key="Scheduled">Consultant</Menu.Item>
  </Menu>
);

const handleSearch = (value) => {
  setCurrentPage(1);
  setSearchText(value);
};

const rowClassName = () => "cursor-pointer";

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
    </div>

    <div className="bg-white w-full px-8 py-4 ml-4 flex justify-between">
      <Search
        className="w-80 mt-4"
        placeholder="Search Employee"
        onSearch={handleSearch}
        style={{ width: "500px" }}
      />
      <div className="flex items-center">
        <Dropdown
          overlay={statusMenu}
          trigger={["click"]}
          className="mr-2 text-sm"
        >
          <a onClick={(e) => e.preventDefault()}>
            {selectedStatus || "All"} <DownOutlined />
          </a>
        </Dropdown>
        <button
          onClick={AddEmployees}
          className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-4"
        >
          <FiPlus /> Add New Employees
        </button>
      </div>
    </div>

    <div className="bg-white w-full px-8 py-4 ml-4">
      <Table
        columns={columns}
        dataSource={filteredEmployees}
        onRow={(record) => {
          return {
            onClick: () => {
              SendEmp(record);

              router.push(`/hrms/employees/employeesOverView`);
              dispatch(setParticularEmpid(record.id));
            },
          };
        }}
        pagination={false}
        rowClassName={rowClassName}
      />
      <div className="flex justify-end mt-6">
        <Pagination
          size="large"
          pageSize = { 10 } 
          total = {100 }
          current = { currentPage }
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={handlePageChange}
        />
      </div>
    </div>
  </div>
);
};

export default Page;