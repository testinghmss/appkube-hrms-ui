"use client";

// ProfessionalForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select, Col, Row, DatePicker, Space, notification ,message} from "antd";
// notification
import { setprofessionalDetails } from "@/redux/slices/Details";

import { useForm } from "antd/lib/form/Form";
import axios from "@/api/axios";


import { useRouter } from "next/navigation";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import api from "@/api/workflow";



const numberRegex = /^[a-zA-Z0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  const accessToken = getAccessTokenFromCookie();



  const [projectManager, setProjectManager] = useState([]);
  console.log('project Manager', projectManager)
  useEffect(() => {
    // Fetch project managers
    const fetchProjectManagers = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: { designation: "Project Manager" },
        });
        setProjectManager(response.data);
      } catch (error) {
        console.error("Error fetching project managers:", error);
      }
    };
    fetchProjectManagers();
  }, []);



  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [designations, setDesignations] = useState();
  const [departments, setDepartments] = useState();
  // const professionalDetails = useSelector(selectProfessionalDetails);
  const [form] = useForm();

  const [formData, setFormData] = useState({});
 useEffect(()=>{
  setIsClient(true)
 },[isClient])
  const handleSubmit = async () => {

    if(isClient){
      const empId = localStorage.getItem("empId");
    console.log("id from localstorage", empId);


    let data = {
      designation_id: formData.designation_id,
      pf: formData.pf,
      uan: formData.uan,
      department_id: formData.department_id,
      reporting_manager_id: formData.reportingManager,
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
        setFormData({})
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


   // Designation GET APi
   const fetchDesinationData = async () => {
    try {
      const response = await axios.get("/designation", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDesignations(response.data)
      console.log("designation",response);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };
  useEffect(() => {
    fetchDesinationData();
  }, [dispatch, accessToken]);

  
  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get("/department", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDepartments(response.data)
      console.log("department",response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  useEffect(() => {
    fetchDepartmentData();
  }, [dispatch, accessToken]);

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
    message.open(
      {type:'error',content: 'please review the details and fill all fields with correct details  ',
      }
    );
  };
const trueNotification = () => {
    message.open(
      {type:'success', content: 'professional information stored,redirected to Equipments details form',
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
        // initialValues={professionalDetails}
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
              {designations?.map((option) => (
                <Select.Option
                  key={option.id}
                  value={option.id}
                  className="rounded-none"
                >
                  {option.designation}
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
              onChange={(value) => handleDropDownChange("department_id", value)}
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
              {departments?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span="3xl">
          {" "}

<Form.Item
        label="Reporting Manager"
        name="reportingManager"
        rules={[
          {
            required: true,
            message: "Please select a reporting manager.",
          },
        ]}
      >
        <Select
          showSearch
          onChange={(value) => {
            handleDropDownChange("reportingManager",value)}}
          // value={selectedReportingMngr}
          placeholder="Select Reporting Manager"
          optionFilterProp="children"
        >
          {projectManager.map((manager) => (
            <Select.Option key={manager.emp_id} value={manager.emp_id}>
              {manager.resource_name}
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
            <Input
              showSearch
              onChange={(value) => handleDropDownChange("work_location", value.target.value)}
              name="work_location"
              style={{ borderRadius: 0 }}
              className="rounded-none"
              placeholder=" Select Work Location "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
            </Input>
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

