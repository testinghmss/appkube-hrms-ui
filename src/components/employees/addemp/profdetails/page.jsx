'use client'

// ProfessionalForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfessionalDetails, selectProfessionalDetails, setDropdownOption } from '../../../../redux/slices/profDetails'

import { Form, Input, Button, Select, Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { useRouter } from 'next/navigation';
import axios from "@/api/axios"
const { Option } = Select;
const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  const dispatch = useDispatch();
  const professionalDetails = useSelector(selectProfessionalDetails);
  const [form] = useForm(); 

  const handleChange = (name, value) => {
    // console.log(name,value)
    dispatch(updateProfessionalDetails({ [name]: value }));
  };

  const handleSubmit = () => {
    // Save data to local storage
    // console.log("succcess", professionalDetails)
    console.log("handling submit")
    putting();
    // localStorage.setItem(
    //   "professionalDetails",
    //   JSON.stringify(professionalDetails)
    // );
    // alert("data stored in local storage");
  };
  const handleSelectChange = (name, value) => {
    dispatch(setDropdownOption({[name]: value}));
};
  const { selectedOption } = useSelector(selectProfessionalDetails);

  const router = useRouter();

  const[ value,setvalue]=useState({})
  // const axios = require('axios');
  
  const putting =  ()=>{
   let data = {
    "designation_id": 1,
    "pf": "3333333  ",
    "uan": "3333333 ",
    "department_id": 6,
    "reporting_manager_id": "960abb87-2007-4c2c-96b1-80420a35a970",
    "work_location": "Office A",
    "start_date": "2024-02-20",
    "emp_id": "184f0014-d70d-4c4d-a973-a84f185477c9"
}
    
    const response = axios.put('/employee/professionalInfo',data)
    .then((response) => {
      console.log("success",response)
    })
    .catch((error) => {
      console.log("error",error)
    })
  
  }

  return (
    <Form
      style={{ padding: "20px", margin: "auto", border: "2px solid #eee" }}
      className=" justify-center items-center w-[80%] "
      onFinish={handleSubmit}
    // Adjust the span value based on your layout
    // Adjust the span value based on your layout
    >
      <Form.Item
        label="Designation"
        name="designation_id"
        rules={[{ required: true, message: "Please select a designation." }]}
      >
      <Select
          className="rounded-none h-11 font-semibold mb-5  w-[25rem]"
          placeholder="Select Designation"
          value={professionalDetails.designation_id}
          onChange={(value) => handleChange("designation", value)}
        >
          <Option value="option10">Option 10</Option>
          <Option value="option11">Option 11</Option>
          <Option value="option12">Option 12</Option>
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="PF No"
            name="pf"
            rules={[
              { required: true, message: "Please enter a PF number." },
              {
                pattern: numberRegex,
                message: "Please enter at least 5 digits for PF number.",
              },
            ]}
          >
            <Input
              className="h-11"
              type="text"
              value={professionalDetails.pf}
              onChange={(e) => handleChange("pf", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="uan No"
            name="uan"
            rules={[
              { required: true, message: "Please enter a uan number." },
              {
                pattern: numberRegex,
                message: "Please enter at least 5 digits for uan number.",
              },
            ]}
          >
            <Input
              className="h-11"
              type="text"
              value={professionalDetails.uan}
              onChange={(e) => handleChange("uan", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="department_id"
        name="department_id"
        rules={[{ required: true, message: "Please select a department_id." }]}
      >
       <Select
            placeholder="Select department_id"
            className="rounded-none mb-5 font-semibold h-11"
            value={professionalDetails.department_id}
            onChange={(value) => handleChange("department_id", value)}
          >
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Reporting Manager"
        name="reporting_manager_id"
        rules={[
          { required: true, message: "Please select a reporting manager." },
        ]}
      >
       <Select
  placeholder="Select Reporting Manager"
  className="h-11 rounded-none mb-5"
  value={professionalDetails.reporting_manager_id}
  onChange={(value) => handleChange("reporting_manager_id", value)}
>
          <Option value="option4">Option 4</Option>
          <Option value="option5">Option 5</Option>
          <Option value="option6">Option 6</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Work Location"
        name="work_location"
        rules={[{ required: true, message: "Please select a work location." }]}
      >
         <Select
    placeholder="Select Work Location"
    className="h-11 rounded-none"
    value={professionalDetails.work_location}
    onChange={(value) => handleChange("work_location", value)} // Corrected here
  >
          <Option value="option7">Option 7</Option>
          <Option value="option8">Option 8</Option>
          <Option value="option9">Option 9</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => {
            setTab(tab + 1);
          }}
          type="primary"
          htmlType="submit"
          className="rounded-none w-full h-14 bg-blue-600"
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfessionalInfo;