"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, Radio, DatePicker } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import personalDetails, {
//   setpersonalDetails,
// } from "@/redux/slices/personalDetails";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
// import axios from "axios";
const { Option } = Select;

const PersonalInformation = ({tab,setTab}) => {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const [form] = Form.useForm();
  // const Details = useSelector((state) => state.personalDetails) || {};

 

  const onFinish = (values) => {
    console.log("Success:", values);
    // dispatch(setpersonalDetails(values));
    // localStorage.setItem("formData", JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {};

  const nextStore = async (values) => {
    
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      work_email: values.work_email,
      gender: values.gender,
      dob: values.dob,
      number: values.number,
      emergency_number: values.emergency_number,
      highest_qualification: values.highest_qualification,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      landmark: values.landmark,
      country: values.country,
      state: values.state,
      city: values.city,
      zipcode: values.zipcode,
      emp_type: 1,
      image: "https://www.udemy.com/logout/#learning-tools",
    };
    try {
      console.log("data", data.emp_type);
      const response = await axios.post("/employee/personalInfo", data);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }

   

   
  };



  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "100px" }}>
      {/* "Choose an image" section */}
      <div className="image-upload-container">
        <div
          style={{
            border: "2px dashed gray ",
            padding: "12px",
            height: "20vh",
            width: "8vw",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="upload image"
                className="img-display-after"
                style={{ width: "100px", height: "116px" }}
              />
            ) : (
              <div className="flex justify-center mt-7">
                <label htmlFor="image-upload-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={60}
                    height={60}
                    style={{
                      marginRight: "16px",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    viewBox="0 0 512 512"
                  >
                    <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                  </svg>
                </label>
              </div>
            )}
          </div>

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Form */}
      <Form
        requiredMark={false}
        name="basic"
        labelCol={{
          span: 6,
        }}
        labelWrap
        style={{ text: "start" }}
        onFinish={nextStore}
        // wrapperCol={{
        //   span: 18,
        // }}
        labelAlign="left"
        className="w-[55%] text-start "
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  pattern: /^[A-Za-z]+$/,
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="rounded-none" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
              ]}
            >
              <Input className="rounded-none" placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Col span="3xl">
          <Form.Item
            label="Email Address"
            name="email"
            labelCol={{
              span: 3,
            }}
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please input your Work Email Address!",
              },
            ]}
          >
            <Input
              className="rounded-none"
              placeholder="Enter Your Email Address"
            />
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Work Email"
            labelCol={{
              span: 3,
            }}
            name="work_email"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please input your Work Email Address!",
              },
            ]}
          >
            <Input
              className="rounded-none"
              placeholder="Enter Your Work Email Address"
            />
          </Form.Item>
        </Col>

        <div className="">
          <Row>
            <Form.Item
              label="Gender"
              name="gender"
              style={{ marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <Radio.Group
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "32px",
                }}
              >
                <Radio.Button value="Male">Male</Radio.Button>
                <Radio.Button value="Female">Female</Radio.Button>
                <Radio.Button value="Other">Other</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Row>{" "}
          <br></br>{" "}
        </div>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Contact no"
              name="number"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please input you Contact no!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Enter Your Contact No."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Emergency Contact no :"
              name="emergency_number"
              colon={false}
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please input your Emergency Contact no!",
                },
              ]}
            >
              <Input className="rounded-none" placeholder="Emergency No." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Qualification"
              name="highest_qualification"
              rules={[
                {
                  required: true,
                  message: "Please input your Qualification!",
                },
              ]}
            >
              <Input className="rounded-none" placeholder="BCA" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please input your Date of Birth!",
                },
              ]}
            >
              <DatePicker className="rounded-none w-[100%]" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Address line 1"
              name="address_line_1"
              rules={[
                {
                  required: true,
                  message: "Please input you Address line 1!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Enter Your Address"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address line 2"
              name="address_line_2"
              rules={[
                {
                  required: true,
                  message: "Please input your Address line 2!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Enter Your Address"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Landmark"
              name="landmark"
              rules={[
                {
                  required: true,
                  message: "Please input your Landmark!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Enter Your Landmark"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Select Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please Select Your Country!",
                },
              ]}
            >
              <Select placeholder="Select Your Country">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <Select placeholder="Select State">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <Select placeholder="Select City">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Col span={12}>
          <Form.Item
            label="Zip Code"
            name="zipcode"
            rules={[
              {
                required: true,
                message: "Please input your Zip code!",
              },
            ]}
          >
            <Input className="rounded-none" placeholder="Enter Your Zip Code" />
          </Form.Item>
        </Col>

        <div className="w-full flex justify-center h-[40px] ">
          {/* <Button
        onClick={() => {
          setTab(tab + 1);
        }}
        // router.push("/employees/addemp/profdetails");
        block
        // htmlType="submit"
        type="primary"
        style={{
          width: "30vw",
          color: "white",
          backgroundColor: "#1890FF",
          height: "100%",
          borderRadius: "5px",
        }}
      >
        Next
      </Button> */}
          <button className="bg-[#1890ff] w-[418px] text-white border hover:bg-white hover:text-[#1890FF] hover:border-[#1890FF] transition-all h-full rounded-none" onClick={()=>{
            setTab(tab+1)
          }}>
            Next
          </button>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
