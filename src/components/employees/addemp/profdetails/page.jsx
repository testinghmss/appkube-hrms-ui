"use client";

// ProfessionalForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Form, Input, Button, Select, Col, Row,DatePicker, Space } from "antd";
import { useForm } from "antd/lib/form/Form";

import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import { updateProfessionalDetails, selectProfessionalDetails, setDropdownOption,
  setDropdownOptionDesig,setDropdownOptionwork,setDropdownOptionReport,setSelectedDate} from "../../../../redux/slices/profDetails";

const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  const handleSelectChange = (value) => {
    dispatch(setDropdownOption(value));
  };
  const handlework=(value)=>{
    dispatch(setDropdownOptionwork(value));
  }
  const handleDesig=(value)=>{
    dispatch(setDropdownOptionDesig(value));
  }
  const handlReportk=(value)=>{
    dispatch(setDropdownOptionReport(value));
  }
  const handleDateChange = (date, dateString) => {
    // Dispatch the action to update the selectedDate in the Redux store
    dispatch(setSelectedDate(dateString));
  };
  const dispatch = useDispatch();
  const professionalDetails = useSelector(selectProfessionalDetails);
  const [form] = useForm();

  const handleChange = (name, value) => {
    // console.log(name,value)
    dispatch(updateProfessionalDetails({ [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateProfessionalDetails(professionalDetails))
    console.log(professionalDetails);
    putting(professionalDetails)
    
  };
  const router = useRouter();
  const prof1=["option1","option2","option3"]
  const prof=["option1","option2","option3"]
 

  const putting = async (values) => {
    let data = {
      // designation_id: values.selectedDesignation,
      designation_id: 4,
      pf: values.pfNumber,
      uan: values.uanNumber,
      // department_id: values.selectedDepartment,
      department_id:5,
      // reporting_manager_id: values.selectedReportingMngr,
      reporting_manager_id:'61a6b732-1597-444a-afcc-10eeafbacc63',
      work_location: values.selectedworkLocation,
      start_date: values.selectedDate,
      emp_id: values.employeeId,
    };

    try{
      console.log('stored data',data)
      const response = await axios.put("/employee/professionalInfo", data)
      console.log("success", response);

    }  
    catch(error){
        console.log("error", error);
      }
  };

  
  const  selectedDepartment = useSelector((state) => state.selectedDepartment);
  const  selectedDesignation = useSelector((state) => state.selectedDesignation);
  const  selectedReportingMngr = useSelector((state) => state.selectedReportingMngr);
  const  selectedworkLocation = useSelector((state) => state.selectedworkLocation);
  const selectedDate = useSelector((state) => state.selectedDate);

  return (
    <div>
      <Form
        requiredMark={false}
        style={{
          padding: "50px",
          border: "2px solid #eee",
          borderRadius: "none",
        }}
        className="m-20 w-[90%] rounded-none"
        onFinish={handleSubmit}
      >
        <Form.Item
          className="w-[49.3rem] rounded-none "
          label="Designation"
          name="designation"
          rules={[{ required: true, message: "Please select a designation." }]}
        >
          <Select
            showSearch
            style={{ width: 611, marginLeft: 95 }}
            className="rounded-none"
            onChange={handleDesig}
            value={selectedDesignation}
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

        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              label="PF No (Optional)"
              name="pfNumber"
              rules={[
                { message: "Enter Your PF Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for PF number.",
                },
              ]}
            >
              <Input
                placeholder="Enter your PF number"
                className="ml-[70px] w-[250px] "
                type="text"
                value={professionalDetails.pfNumber}
                onChange={(e) => handleChange("uanNumber", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="UAN No (Optional)"
              name="uanNumber"
              className="ml-[20px]"
              rules={[
                { message: "Enter Your UAN Number" },
                {
                  pattern: numberRegex,
                  message: "Please enter at least 5 digits for UAN number.",
                },
              ]}
            >
              <Input
                placeholder="Enter Your UAN Number"
                className="w-[205px] "
                type="text"
                value={professionalDetails.uanNumber}
                onChange={(e) => handleChange("pfNumber", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Employee ID (Optional)"
          name="employeeId"
          rules={[
            { message: "Enter Your Employee ID" },
            {
              // pattern: numberRegex,
              message: "Please enter at least 5 digits for UAN number.",
            },
          ]}
        >
          <Input
            placeholder="Enter Your Employee ID"
            className="w-[611px] ml-[30px]"
            type="text"
            value={professionalDetails.employeeId}
            onChange={(e) => handleChange("employeeId", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="w-[49rem] rounded-none"
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please select a department." }]}
        >
          <Select
            showSearch
            style={{ width: 611, marginLeft: 100, borderRadius: 0 }}
            className="rounded-none"
            onChange={handleSelectChange}
            value={selectedDepartment}
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
        <Form.Item
          className="w-[54rem]"
          label=" Direct Reporting Manager"
          name="reportingManager"
          rules={[
            { required: true, message: "Please select a reporting manager." },
          ]}
        >
          <Select
            showSearch
            style={{ width: 611, marginLeft: 15, borderRadius: 0 }}
            className="rounded-none"
            onChange={handlReportk}
            value={selectedReportingMngr}
            placeholder="Select Reporting Manager "
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
        <Form.Item
          className="w-[50rem]"
          label="Work Location"
          name="workLocation"
          rules={[
            { required: true, message: "Please select a work location." },
          ]}
        >
          <Select
            showSearch
            style={{ width: 611, marginLeft: 85, borderRadius: 0 }}
            className="rounded-none"
            onChange={handlework}
            value={selectedworkLocation}
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
        <Form.Item
          className="w-[700px]"
          label="Started Date"
          name="Date"
          rules={[{ message: "Please select a  Date" }]}
        >
          <Space direction="vertical">
            <DatePicker
              onChange={handleDateChange}
              value={selectedDate}
              className=" w-[611px] ml-[98px]"
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <button
            onClick={()=>{setTab(tab+1)}}
            htmlType="submit"
            className="rounded-md w-[418px] ml-80 h-[40px] bg-[#1890FF] text-white hover:bg-white hover:text-[#1890FF] border hover:border-[#1890FF]"
          >
            Next
          </button>
        </Form.Item>
        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            className="rounded-md w-20 h-8 bg-blue-600"
          >
            <Link href="/ProfReview">Review</Link>
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default ProfessionalInfo;
