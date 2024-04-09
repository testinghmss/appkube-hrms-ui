"use client";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setpersonalDetails } from "@/redux/slices/Details";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store/store";
import { Form, Input, Row, Col, Select, Radio, Upload } from "antd";
const { Option } = Select;
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Mainaxios from "@/api/axios";
import axios from "@/api/axios";
import CountryComponent from "@/components/location/Countrys";
import StateComponent from "@/components/location/States";
import CityComponent from "@/components/location/city";
import { notification } from "antd";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const beforeUpload = (file) => {
  const isPng = file.type === "image/png";
  if (!isPng) {
    message.error("You can only upload PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isLt2M;
};
const PersonalInformation = ({ tab, setTab }) => {
  const accessToken = getAccessTokenFromCookie();
  const persDetails = useSelector((state) => state.Details);
  const router = useRouter();
  const [req, setReq] = useState({ fileName: "", data: "" });
  const [fileuploaded, setfileuploaded] = useState(false);
  const [Attachments, setAttachments] = useState("");
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setselectedState] = useState();

  const [formData, setFormData] = useState({
    email: "",
    work_email: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    emergency_number: "",
    highest_qualification: "",
    image: "",
    landmark: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });
  // const [status ,setStatus] = useState(null)
  // const [image,setImage] = useState(null)

  const falseNotification = () => {
    notification.open({
      message:
        "please review the details and fill all fields with correct details",
      style: {
        backgroundColor: "white",
        color: "red", // Set the background color
      },
    });
  };
  const trueNotification = () => {
    notification.open({
      message:
        "personal information stored,redirected to professional details form",
      style: {
        backgroundColor: "white",
        color: "blue", // Set the background color
      },
    });
  };
  const imageTrueNotification = () => {
    notification.open({ message: "Image uploaded successfully!" });
  };
  const imageFalseNotification = () => {
    notification.open({ message: "Error uploading image. Please try again." });
  };

  const handleInputChange = (e) => {
    console.log("form data", formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check if both number and emergency_number fields have values
    if (formData.number && formData.emergency_number) {
      // Compare the values
      if (formData.number === formData.emergency_number) {
        notification.error({
          message: "Number and Emergency Number cannot be the same."
        });
      }
    }

  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY/MM/DD");
      setFormData({ ...formData, dob: formattedDate });
    } else {
      setFormData({ ...formData, dob: null });
    }
  };

  const datetoshow = formData.dob
    ? moment(formData.dob, "YYYY/MM/DD").toDate()
    : null;

  const handleDropDownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(name, value, "change");
  };
  const dateHandle = (name, value) => {
    const dateValue = value ? value.format("YYYY-MM-DD") : "";
    setFormData({ ...formData, [name]: dateValue });
    console.log(name, dateValue, "change");
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    // if (info.file.status === "uploading") {
    // console.log(info, 'info')
    // setLoading(true);
    // return;
    // }
    // if (info.file.status === "done") {
    const file = info.file.originFileObj;
    if (file) {
      setLoading(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setReq({ fileName: file.name, data: base64 });
        setfileuploaded(true);
        setImageUrl(base64);
        setFormData({ ...formData, image: Attachments });
      };
      reader.readAsDataURL(file);
    }
    // }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  console.log("object");
  const handleAddItemButtonClick = async () => {
    console.log(formData, "hitting api");
    console.log("imagr", imageUrl);
    // making data into format to hit api
    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      work_email: formData.work_email,
      gender: formData.gender,
      dob: formData.dob,
      number: formData.number,
      emergency_number: formData.emergency_number,
      highest_qualification: formData.highest_qualification,
      address_line_1: formData.address_line_1,
      address_line_2: formData.address_line_2,
      landmark: formData.landmark,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zipcode: formData.zipcode,
      emp_type: 1,
      image: Attachments,
    };

  //   if (formData.number === formData.emergency_number) {
  //     notification.open({
  //         message: "Number and Emergency Number cannot be the same.",
  //     });
  //     return; // Stop further execution
  // }

    try {
      console.log("data", data);
      console.log("assTo", accessToken);
      if (data.email & data.email === data.work_email) {
        notification.open({
          message: "email and work email must be different  .",
        });
      } else if (data.number & data.number === data.emergency_number) {
        notification.open({
          message: "number and emergency number  must be different  .",
        });
      } else {
        const response = await Mainaxios.post("/employee/personalInfo", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response", response);
        if (response.status === 200) {
          // localStorage.setItem('empId', response.data.id)

          console.log("response data", response.data);
          // storing the response in redux
          dispatch(setpersonalDetails(response.data));
          // getting employee id from local storage

          const id = localStorage.getItem("empId");
          //  checking tthe existance of employee id
          if (id) {
            console.log("previouse id of local storage present", id);
            // if id is existing then we will remote it from local storage
            localStorage.removeItem("empId");
            console.log(
              "id deleted from local storage",
              localStorage.getItem("empId")
            );
            // seting new empid for its information update
            localStorage.setItem("empId", response.data.id);
            console.log("new id", localStorage.getItem("empId"));
          } else {
            localStorage.setItem("empId", response.data.id);
          }
          // setStatus(true)
          await trueNotification();
          // changing tab
          setTab(tab + 1);
        }
      }

      // const id = localStorage.getItem("empId");
      // //  checking tthe existance of employee id
      // if (id) {
      //   console.log("previouse id of local storage present", id);
      //   // if id is existing then we will remote it from local storage
      //   localStorage.removeItem("empId");
      //   console.log(
      //     "id deleted from local storage",
      //     localStorage.getItem("empId")
      //   );
      //   // seting new empid for its information update
      //   localStorage.setItem("empId", response.data.id);
      //   console.log("new id", localStorage.getItem("empId"));
      // } else {
      //   localStorage.setItem("empId", response.data.id);
      // }
      // // changing tab
      // setTab(tab + 1);
    } catch (error) {
      console.log("error occured", error);
      if (error.response?.data?.error?.detail) {
        console.log("message is", error.response?.data?.error?.detail);
        const str = error.response?.data?.error?.detail

        
        const regex = /Key \((\w+)\)=\(([^)]+)\)/;
        

        const match = str.match(regex);

       
        const key = match && match.length > 1 ? match[1] : null;
        const value = match && match.length > 2 ? match[2] : null;

        console.log("detail email", `key ${key}:${value}`);
        notification.open({
          message: `${value} already exist , try with other email`,
        });
      }
      else{

        await falseNotification();
      }
      // setTab(tab + 1)
    }
  };
  const uploadFile = async () => {
    console.log("uploading");

    try {
      const response = await axios.post(
        "/docUpload",

        req,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("image uploaded", response.data);
      // alert("Image uploaded successfully!");
      // setImage(true)
      // imageTrueNotification()
      setAttachments(response.data.link);
    } catch (error) {
      // console.error(error);
      console.log(error);
      // setImage(false)
      imageFalseNotification();
      // alert("Error uploading image. Please try again.");
    }
  };
  console.log(req);
  if (fileuploaded) {
    // setfileuploaded(true);
    uploadFile();
    setfileuploaded(false);
  }
  return (
    <div className="gap-[100px] w-[98%] md:flex bg-white pt-5 pl-5 mr-10">
      <div className="image-upload-container">
        <Upload
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          // beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <Image
              src={Attachments}
              alt="avatar"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>

      {/* Form */}
      <Form
        requiredMark={false}
        name="basic"
        labelCol={{
          span: 6,
        }}
        labelWrap
        initialValues={persDetails}
        style={{ text: "start" }}
        labelAlign="left"
        className="w-[70%] text-start"
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="First Name"
              name="first_name"
              onChange={handleInputChange}
              rules={[
                {
                  pattern: /^(?:[A-Za-z\s]{3,})$/,
                  required: true,
                  message: "Name must have atleast 3 letters! , name can't contain numbers and special characters ",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="First Name"
                name="first_name"
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Last Name"
              name="last_name"
              onChange={handleInputChange}
              rules={[
                {
                  pattern: /^(?:[A-Za-z\s]{3,})$/,
                  required: true,
                  message: "Name must have atleast 3 letters! , name can't contain numbers and special characters ",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Last Name"
                name="last_name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span="3xl">
          <Form.Item
            label="Email Address"
            name="email"
            onChange={handleInputChange}
            labelCol={{
              span: 3,
            }}
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please input your Email Address!",
              },
            ]}
          >
            <Input
              className="rounded-none"
              placeholder="Enter Your Email Address"
              name="email"
            />
          </Form.Item>
        </Col>
        <Col span="3xl">
          <Form.Item
            label="Work Email :
              (Optional)"
            onChange={handleInputChange}
            labelCol={{
              span: 3,
            }}
            name="work_email"
            colon={false}
            rules={[
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please input your Work Email Address!",
              },
            ]}
          >
            <Input
              className="rounded-none"
              placeholder="Enter Your Work Email Address"
              name="work_email"
            />
          </Form.Item>
        </Col>

        <div className="">
          <Row>
            <Form.Item
              label="Gender"
              name="gender"
              onChange={handleInputChange}
              style={{ marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <Radio.Group
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "38px",
                }}
                name="gender"
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
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Contact no"
              name="number"
              onChange={handleInputChange}
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
                name="number"
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Emergency Contact no :"
              name="emergency_number"
              onChange={handleInputChange}
              colon={false}
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please input your Emergency Contact no!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="Emergency No."
                name="emergency_number"
                maxLength={10}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Qualification"
              name="highest_qualification"
              onChange={handleInputChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Qualification!",
                },
              ]}
            >
              <Input
                className="rounded-none"
                placeholder="BCA"
                name="highest_qualification"
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              onChange={handleInputChange}
              rules={[
                {
                  required: true,
                  message: "Please input your Date of Birth!",
                },
              ]}
            >
              <DatePicker
                selected={datetoshow}
                onChange={handleDateChange}
                placeholderText="DOB"
                className="p-1 mb-2 border border-gray-300 rounded-md focus:outline-[#188fffea] focus:outline-1 w-[192%]"
                maxDate={moment().subtract(18, "years").toDate()}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Address line 1"
              name="address_line_1"
              onChange={handleInputChange}
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
                name="address_line_1"
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Address line 2"
              name="address_line_2"
              onChange={handleInputChange}
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
                name="address_line_2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Landmark"
              name="landmark"
              onChange={handleInputChange}
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
                name="landmark"
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="Select Country"
              name="country"
              onChange={(value) => handleDropDownChange("country", value)}
              rules={[
                {
                  required: true,
                  message: "Please Select Your Country!",
                },
              ]}
            >
              <CountryComponent
                onChange={(value) => {
                  handleDropDownChange("country", value),
                    setSelectedCountry(value);
                }}
              />
              {/* <Select placeholder="Select Your Country" name="country" onChange={(value) => handleDropDownChange("country", value)}>
                  <Option value="option1" name="country">Option 1</Option>
                  <Option value="option2" name="country">Option 2</Option>
                  <Option value="option3" name="country">Option 3</Option>
                </Select> */}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="State"
              name="state"
              onChange={handleInputChange}
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <StateComponent
                countryCode={selectedCountry}
                onChange={(value) => {
                  handleDropDownChange("state", value), setselectedState(value);
                }}
              />
              {/* <Select placeholder="Select State" name="state" onChange={(value) => handleDropDownChange("state", value)}>
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select> */}
            </Form.Item>
          </Col>

          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item
              label="City"
              name="city"
              onChange={handleInputChange}
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <CityComponent
                countryCode={selectedCountry}
                stateCode={selectedState}
                onChange={(value) => handleDropDownChange("city", value)}
              />
              {/* <Select placeholder="Select City" name="city" onChange={(value) => handleDropDownChange("city", value)}>
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select> */}
            </Form.Item>
          </Col>
        </Row>

        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Form.Item
            label="Zip Code"
            name="zipcode"
            onChange={handleInputChange}
            rules={[
              {
                pattern:/^[0-9]{6}$/,
                required: true,
                message: "Please input your 6 digit zip code!",
              },
            ]}
          >
            <Input
              className="rounded-none"
              name="zipcode"
              placeholder="Enter Your Zip Code"
            />
          </Form.Item>
        </Col>
        <div className="w-full flex justify-center h-[40px]">
          <button
            className="bg-[#1890ff] w-[418px] text-white h-full rounded-none"
            onClick={handleAddItemButtonClick}
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
};
export default PersonalInformation;
