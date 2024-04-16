"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Pagination,
  Input,
  Select,
  Dropdown,
  Menu,
  Button,
  Drawer,
  Breadcrumb,
} from "antd";
import { DownOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";
import Popup from "./Modal";
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import Modal1 from "./Modal1";
import Modal3 from "./Modal3";
import Modal2 from "./Modal2";

const { Search } = Input;
//const { Option } = Select;

const App = () => {
  const [datas, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmployeesForReminder, setSelectedEmployeesForReminder] =
    useState([]);
  const [info, setInfo] = useState(10);
  const [invitation , setInvitation] = useState(false);

  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");
        const response = await axios.get(
          `/employee/tracker?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("tracker data", response);
        setData(response.data.employees);
        const response1 = await axios.get("/dashboard/dashboardStats", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response of dashboard", response1.data);
        setInfo(parseInt(response1.data.Totalemployees));
        console.log("");
      } catch (error) {
        console.log("error of tracker", error);
      }
    };

    fetchData(); // Call fetchData here

    console.log("in use effect");
  }, [accessToken, currentPage]); // Include dependencies accessToken and setData

  const handlePageChange = (page) => {
    console.log("this is page no click ::", page);
    setCurrentPage(page);
    console.log("this is current page ::", currentPage);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSearch = (value) => {
    setCurrentPage(1);
    setSearchText(value);
  };

  const handleStatusChange = (value) => {
    setCurrentPage(1);
    setSelectedStatus(value);
  };

  const handleEmployeeClick = (record) => {
    console.log("Selected Employee:", record);
    setSelectedEmployee(record);
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleAllClick = () => {
    setSelectedStatus(null);
  };

  const handleSendReminderClick = () => {
    setShowCheckboxes(true);
  };

  const handleCheckboxChange = (record) => {
    setSelectedEmployeesForReminder((prevSelected) => {
      const index = prevSelected.findIndex((item) => item === record);

      if (index !== -1) {
        // If already selected, remove the item
        return [
          ...prevSelected.slice(0, index),
          ...prevSelected.slice(index + 1),
        ];
      } else {
        // If not selected, add the item
        return [...prevSelected, record];
      }
    });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {showCheckboxes && (
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(record)}
              checked={selectedEmployeesForReminder.some(
                (item) => item.key === record.key
              )}
              style={{ marginRight: "8px" }}
            />
          )}
          <a
            className="cursor-pointer"
            onClick={() => {
              console.log("clicked");
              handleEmployeeClick(record);
            }}
          >
            {text}
          </a>
        </div>
      ),
      render: (text, record) => (
        <div className="flex items-center ">
          {showCheckboxes && (
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(record)}
              checked={selectedEmployeesForReminder.some(
                (item) => item.key === record.key
              )}
              style={{ marginRight: "8px" }}
            />
          )}
          <img
            src={record?.image}
            alt={record.employee_name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <a
            className="cursor-pointer"
            onClick={() => {
              console.log("clicked");
              handleEmployeeClick(record);
            }}
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <a
          onClick={() => {
            console.log("clicked");
            handleEmployeeClick(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Employee Status",
      key: "employee_status",
      dataIndex: "employee_status",
      render: (employeeStatus) => {
        const tagColors = {
          DRAFT: "lightgray",
          SENT: "yellow",
        };

        const color = tagColors[employeeStatus] || "defaultColor";

        return (
          <Tag color={color} key={employeeStatus}>
            {employeeStatus}
          </Tag>
        );
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Type",
      key: "employee_type",
      dataIndex: "employee_type",
      render: (employeeType) => {
        const tagColors = {
          PERMANENT: "purple",
          CONSULTANT: "blue",
        };

        const color = tagColors[employeeType];

        return (
          <Tag color={color} key={employeeType}>
            {employeeType}
          </Tag>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     key: '1',
  //     employeename: 'shaistha samreen',
  //     emailaddress: 'shaisthasamreen786@gmail.com',
  //     employeestatus: ['Active'],
  //     designation: 'Go Developer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key: '2',
  //     employeename: 'Jim Green',
  //     emailaddress: 'jimgreen@gmail.com',
  //     employeestatus: ['Scheduled'],
  //     designation: 'cloud Engineer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key: '3',
  //     employeename: 'Joe Black',
  //     emailaddress: 'joeblack@gmail.com',
  //     employeestatus: ['Invited'],
  //     designation:'UI/UX Designer',
  //     employeetype: ['Consultant'],
  //   },
  //  {
  //     key: '4',
  //     employeename: 'Joe',
  //     emailaddress: 'joe@gmail.com',
  //     employeestatus: ['Active'],
  //     designation: 'cloud Engineer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key: '5',
  //     employeename: 'Joe',
  //     emailaddress: 'joe@gmail.com',
  //     employeestatus: ['Draft'],
  //     designation: 'Go Developer',
  //     employeetype: ['Consultant'],
  //   },
  //   {
  //     key: '6',
  //     employeename: 'Mary',
  //     emailaddress: 'Mary07@gmail.com',
  //     employeestatus: ['Active'],
  //     designation: 'Go Developer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key: '7',
  //     employeename: 'Joe mark',
  //     emailaddress: 'joemark@gmail.com',
  //     employeestatus: ['Invited'],
  //     designation: 'UI/UX Designer',
  //     employeetype: ['Consultant'],
  //   },
  //   {
  //     key: '8',
  //     employeename: 'Joe',
  //     emailaddress: 'joe@gmail.com',
  //     employeestatus: ['Draft'],
  //     designation: 'UI/UX Designer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key: '9',
  //     employeename: 'John',
  //     emailaddress: 'johnbaig@gmail.com',
  //     employeestatus: ['Active'],
  //     designation: 'cloud Engineer',
  //     employeetype: ['Consultant'],
  //   },
  //   {
  //     key: '10',
  //     employeename: 'samreen',
  //     emailaddress: 'samreen@gmail.com',
  //     employeestatus: ['Scheduled'],
  //     designation: 'Go Developer',
  //     employeetype: ['Permanent'],
  //   },
  //   {
  //     key:'11',
  //     employeename: 'Rose',
  //     emailaddress: 'Rose@gmail.com',
  //     employeestatus: ['Invited'],
  //     designation: 'UI/UX Designer',
  //     employeetype: ['Consultant'],
  //   },
  //   {
  //     key:'12',
  //     employeename: 'Joe',
  //     emailaddress: 'joe@gmail.com',
  //     employeestatus: ['Scheduled'],
  //     designation: 'React Developer',
  //     employeetype: ['Permanent'],
  //   },
  //   ];

  //const pageSizeOptions = [10, 20, 30, 40, 50];

  const filteredData = datas.filter((item) => {
    const statusMatch =
      !selectedStatus || item.employee_status.includes(selectedStatus);
    // const textMatch = Object.values(item).some((value) => {
    //   if (value === null || value === undefined) {
    //     return false;
    //   }
    //   return value.toString().toLowerCase().includes(searchText.toLowerCase());
    // });
    const textMatch =
      item.employee_name &&
      item.employee_name.toLowerCase().includes(searchText.toLowerCase());
    return statusMatch && textMatch;
  });
  // const startIdx = (currentPage - 1) * pageSize;
  // const endIdx = currentPage * pageSize;
  // const displayedData = filteredData.slice(startIdx, endIdx);

  const statusMenu = (
    <Menu
      onClick={({ key }) =>
        key === "All" ? handleAllClick() : handleStatusChange(key)
      }
    >
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Scheduled">Scheduled</Menu.Item>
      <Menu.Item key="Invited">Invited</Menu.Item>
      <Menu.Item key="Draft">Draft</Menu.Item>
    </Menu>
  );
  return (
    <div className="">
      <div className="flex justify-between p-4">
        <div className="flex flex-col gap-2">
          <Breadcrumb
            items={[
              {
                title: "Dashboard",
              },
              {
                title: <a href="">Tracker</a>,
              },
            ]}
          />
          <h2 className="text-xl font-semibold">Tracker</h2>
        </div>
      </div>
      <div className="bg-white w-full px-8 py-4 ml-4">
        <div className="flex justify-between mb-5">
          <div>
            <Search
              className="w-80"
              placeholder="Search Employee"
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
            />
          </div>
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
            <Button
              type="primary"
              className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-4 rounded-none"
              onClick={handleSendReminderClick}
            >
              Send Reminder
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={filteredData} pagination={false} />
        <div className="flex justify-end mt-6">
          {/* <Pagination
            size="large"
            pageSize={10}
            total={100}
            current={currentPage}
            showTotal={(total, range) =>
              ${range[0]}-${range[1]} of ${total} items
            }
            onChange={handlePageChange}
          /> */}
          <Pagination
            size="large"
            pageSize={10}
            total={info} // Use the length of filteredData as total
            current={currentPage}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={handlePageChange}
          />
        </div>
        <Drawer
          placement="right"
          closable={false}
          onClose={onCloseDrawer}
          open={drawerVisible}
          width={650}
        >
          {selectedEmployee && (
            <>
              <div className="h-28 flex items-center justify-between">
                <div className="text-center text-3xl font-medium ">
                  <p>{selectedEmployee.employee_name}</p>
                </div>
                <div className="h-full">
                  <div className="ml-32 text-xs" onClick={onCloseDrawer}>
                    <CloseOutlined />
                  </div>
                  {selectedEmployee.employee_status === "SCHEDULED" && (
                    <Popup />
                  )}
                  {selectedEmployee.employee_status === "INVITED" && <Modal1 />}
                  {selectedEmployee.employee_status === "DRAFT" && (
                    <Modal2 id={selectedEmployee.id} />
                  )}
                  {/* {selectedEmployee.employee_status === 'ACTIVE' && <Modal3/>} */}
                  {selectedEmployee.employee_status === "SENT" && (
                    <Modal3 id={selectedEmployee.id} />
                  )}

                  {/* switch(selectedEmployee.employee_status) {
    case "draft": return <Modal1/>
    break
    default:return
  } */}
                  {/*   
  <Popup/>
  <Modal1/>
  <Modal2/>
  <Modal3/> */}
                </div>
              </div>

              <div className="border border-gray-200 p-4 w-11/12 ml-7 border-b-0">
                <p className="text-lg font-semibold">
                  This Employee has not yet been invited to the application
                </p>
              </div>

              <div className="border border-gray-200 p-4 w-11/12 ml-7">
                {selectedEmployee.employee_name} can sign up and complete
                onboarding after receiving the invite.
                <div className="mt-4">
                  <button className="bg-red-500 text-white h-8 w-32">
                    End Agreement
                  </button>
                </div>
              </div>

              <div>
                <div className="flex gap-6 h-16 mt-8">
                  <div className=" w-full h-full border-b border-slate-200">
                    <h2 className="font-normal text-base text-slate-400">
                      First Name
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.first_name}
                      </p>
                    </h2>
                  </div>
                  <div className="w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Last Name
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.last_name}
                      </p>
                    </h2>
                  </div>
                </div>

                <div className="flex gap-6 h-16">
                  <div className=" w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Date of Birth
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.dob.split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </p>
                    </h2>
                  </div>
                  <div className="w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Gender
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.gender}
                      </p>
                    </h2>
                  </div>
                </div>

                <div className="flex gap-6 h-16">
                  <div className=" w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Contact No.
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.number}
                      </p>
                    </h2>
                  </div>
                  <div className="w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Email
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.work_email}
                      </p>
                    </h2>
                  </div>
                </div>

                <div className="flex gap-6 h-16">
                  <div className=" w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Emergency Contact Number
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.number}
                      </p>
                    </h2>
                  </div>
                  <div className="w-full h-full border-b border-slate-200">
                  <h2 className="font-normal text-base text-slate-400">
                      Qualification
                      <br />
                      <p className="text-slate-800 mt-1">
                        {selectedEmployee.highest_qualification}
                      </p>
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </Drawer>
        {/* <div className="flex justify-end mt-5">
          <Pagination
            size="large"
            // total={filteredData.length}
            total={100}
            current={currentPage}
            //showTotal={(total) => Total ${total} items}
            onChange={handlePageChange}
            showTotal={(total, range) =>
              ${range[0]}-${range[1]} of ${total} items
            }
          />
        </div> */}
      </div>
    </div>
  );
};
export default App;
