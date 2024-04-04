"use client";

// ProfessionalForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select, Col, Row, DatePicker, Space, notification } from "antd";
// notification
import { setprofessionalDetails } from "@/redux/slices/Details";

// import { setprofessionalDetails } from "@/redux/slices/Details";
import { useForm } from "antd/lib/form/Form";
import axios from "@/api/axios";
// import axios from "@/api/axios";

import { useRouter } from "next/navigation";
import getAccessTokenFromCookie from "@/utils/getAccessToken";

// import {
//   updateProfessionalDetails,
//   selectProfessionalDetails,
//   setDropdownOption,
//   setDropdownOptionDesig,
//   setDropdownOptionwork,
//   setDropdownOptionReport,
//   setSelectedDate,
// } from "../../../../redux/slices/profDetails";

const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  // getting employee id from local storage
 
  // const handleSelectChange = (value) => {
  //   dispatch(setDropdownOption(value));
  // };
  // const handlework = (value) => {
  //   dispatch(setDropdownOptionwork(value));
  // };
  // const handleDesig = (value) => {
  //   dispatch(setDropdownOptionDesig(value));
  // };
  // const handlReportk = (value) => {
  //   dispatch(setDropdownOptionReport(value));
  // };
  // const handleDateChange = (date, dateString) => {
  //   // Dispatch the action to update the selectedDate in the Redux store
  //   dispatch(setSelectedDate(dateString));
  // };
  const dispatch = useDispatch();
  const accessToken = getAccessTokenFromCookie();
  const [isClient, setIsClient] = useState(false);
  // const professionalDetails = useSelector(selectProfessionalDetails);
  const [form] = useForm();

  // const handleChange = (name, value) => {
  //   // console.log(name,value)
  //   dispatch(updateProfessionalDetails({ [name]: value }));
  // };
  const [formData, setFormData] = useState({});
 useEffect(()=>{
  setIsClient(true)
 },[isClient])
  const handleSubmit = async () => {
    // let data = {
    //   // designation_id: values.selectedDesignation,
    //   designation_id: 4,
    //   pf: values.pfNumber,
    //   uan: values.uanNumber,
    //   // department_id: values.selectedDepartment,
    //   department_id: 5,
    //   // reporting_manager_id: values.selectedReportingMngr,
    //   reporting_manager_id: "f81cce0a-84fb-4eb4-b0ec-74b5f2a9fdb7",
    //   work_location: values.selectedworkLocation,
    //   start_date: values.selectedDate,
    //   emp_id: empId,
    // };
    // making data into format to hit api
    if(isClient){
      const empId = localStorage.getItem("empId");
    console.log("id from localstorage", empId);
    let data = {
      designation_id: 4,
      pf: formData.pf,
      uan: formData.uan,
      department_id: 5,
      reporting_manager_id: "f81cce0a-84fb-4eb4-b0ec-74b5f2a9fdb7",
      work_location: formData.work_location,
      start_date: formData.start_date,
      emp_id: empId,
    };

    try {
      console.log("stored data of from in usestate", data);
      const response = await axios.put("/employee/professionalInfo", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("success", response.data);
      if (response.status === 200) {
        // storing the response in redux

        dispatch(setprofessionalDetails(response.data));
        // changing the tab
        trueNotification()

        setTab(tab + 1);
      }
    } catch (error) {
      console.log("error", error);
      falseNotification()
    }
    }
  };
  const router = useRouter();
  const prof1 = ["option1", "option2", "option3"];
  const prof = ["option1", "option2", "option3"];

  // const putting = async (values) => {
  //   let data = {
  //     // designation_id: values.selectedDesignation,
  //     designation_id: 4,
  //     pf: values.pfNumber,
  //     uan: values.uanNumber,
  //     // department_id: values.selectedDepartment,
  //     department_id: 5,
  //     // reporting_manager_id: values.selectedReportingMngr,
  //     reporting_manager_id: "f81cce0a-84fb-4eb4-b0ec-74b5f2a9fdb7",
  //     work_location: values.selectedworkLocation,
  //     start_date: values.selectedDate,
  //     emp_id: empId,
  //   };

  //   try {
  //     console.log("stored data", data);
  //     const response = await axios.put("/employee/professionalInfo", data,{
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}`
  //   }
  // });
  //     console.log("success", response);
  //     if(response.status === 200){
  //       setTab(tab + 1);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const selectedDepartment = useSelector((state) => state.selectedDepartment);
  // const selectedDesignation = useSelector((state) => state.selectedDesignation);
  // const selectedReportingMngr = useSelector(
  //   (state) => state.selectedReportingMngr
  // );
  // const selectedworkLocation = useSelector(
  //   (state) => state.selectedworkLocation
  // );
  // const selectedDate = useSelector((state) => state.selectedDate);
  const handleDropDownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(name, value, "change");
  };
  const dateHandle = (name, value) => {
    const dateValue = value ? value.format("YYYY-MM-DD") : "";
    setFormData({ ...formData, [name]: dateValue });
    console.log(name, dateValue, "change");
  };

  const handleInputChange = (e) => {
    console.log("form data", formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value, "change");
  };
  console.log("form data", formData);
  const professionalDetails = useSelector(
    (state) => state.Details.professionalDetails
  );


  const falseNotification = () => {
    notification.open(
      {message: 'please review the details and fill all fields with correct details  ',
      style: {
        backgroundColor: 'white',
        color:'red',// Set the background color
      }}
    );
  };
const trueNotification = () => {
    notification.open(
      {message: 'professional information stored,redirected to Equipments details form',
      style: {
        backgroundColor: 'white',
        color:'blue',// Set the background color
      },}
    );
  };
  return (
    <div>
      <Form
        requiredMark={false}
        initialValues={professionalDetails}
        style={{
          padding: "50px",
          width: "auto",
          text: "start",
          backgroundColor: "white",
        }}
        labelAlign="left"
        labelCol={{
          span: 5,
        }}
        labelWrap
        className="m-20 w-[90%] rounded-none"
        onFinish={handleSubmit}
      >
        <Col span="3xl">
          <Form.Item
            className="rounded-none "
            label="Designation"
            name="designation_id"
            labelWrap
            rules={[
              { required: true, message: "Please select a designation." },
            ]}
          >
            <Select
              onChange={(value) =>
                handleDropDownChange("designation_id", value)
              }
              showSearch
              name="designation_id"
              className="rounded-none"
              placeholder="Select Designation"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {prof1.map((option) => (
                <Select.Option
                  key={option}
                  value={option}
                  className="rounded-none"
                >
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              label="PF No (Optional)"
              name="pf"
              onChange={handleInputChange}
              rules={[
                { message: "Enter Your PF Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for PF number.",
                },
              ]}
              labelCol={{ span: 10 }}
            >
              <Input
                placeholder="Enter your PF number"
                name="pf"
                type="text"
                style={{ width: "100%", marginLeft: "3%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="UAN No (Optional)"
              name="uan"
              // className="ml-20"
              style={{ marginLeft: "30px" }}
              onChange={handleInputChange}
              rules={[
                { message: "Enter Your UAN Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for UAN number.",
                },
              ]}
              labelCol={{ span: 8 }}
            >
              <Input
                placeholder="Enter Your UAN Number"
                type="text"
                name="uan"
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span="3xl">
          <Form.Item
            label="Employee ID (Optional)"
            onChange={handleInputChange}
            name="emp_id"
            rules={[
              { message: "Enter Your Employee ID" },
              {
                // pattern: numberRegex,
                message: "Please enter at least 5 digits for UAN number.",
              },
            ]}
          >
            <Input name="emp_id" placeholder="Enter Your Employee ID" />
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            className="rounded-none"
            label="Department"
            name="department_id"
            rules={[{ required: true, message: "Please select a department." }]}
          >
            <Select
              onChange={(value) => handleDropDownChange("department", value)}
              name="department_id"
              showSearch
              style={{ borderRadius: 0 }}
              className="rounded-none"
              placeholder="Select Department "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {prof.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          {" "}
          <Form.Item
            label=" Direct Reporting Manager"
            name="reporting_manager_id"
            rules={[
              { required: true, message: "Please select a reporting manager." },
            ]}
          >
            <Select
              onChange={(value) =>
                handleDropDownChange("reportingManager", value)
              }
              showSearch
              style={{ borderRadius: 0 }}
              className="rounded-none"
              placeholder="Select Reporting Manager "
              optionFilterProp="children"
              name="reporting_manager_id"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {prof.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Work Location"
            name="work_location"
            rules={[
              { required: true, message: "Please select a work location." },
            ]}
          >
            <Select
              showSearch
              onChange={(value) => handleDropDownChange("work_location", value)}
              name="work_location"
              style={{ borderRadius: 0 }}
              className="rounded-none"
              placeholder=" Select Work Location "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {prof.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Started Date"
            onChange={(value) => dateHandle("Date", value)}
            name="start_date"
            rules={[{ message: "Please select a  Date" }]}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker
                style={{ width: "100%" }}
                name="start_date"
                onChange={(value) => dateHandle("start_date", value)}
              />
            </Space>
          </Form.Item>
        </Col>
        <Row gutter={16}>
          {/* Other columns */}
          <Col span={18}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#1890ff]"
              style={{
                borderRadius: "0",
                height: "40px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "40%",
              }}
              // onClick={() => {
              //   setTab(tab + 1);
              // }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfessionalInfo;