// "use client";

// // ProfessionalForm.js
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// import { Form, Input, Button, Select, Col, Row,DatePicker, Space } from "antd";
// import { useForm } from "antd/lib/form/Form";

// import { useRouter } from "next/navigation";
// import axios from "@/api/axios";
// import { updateProfessionalDetails, selectProfessionalDetails, setDropdownOption,
//   setDropdownOptionDesig,setDropdownOptionwork,setDropdownOptionReport,setSelectedDate} from "../../../../redux/slices/profDetails";

// const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

// const ProfessionalInfo = ({ tab, setTab }) => {
//   const handleSelectChange = (value) => {
//     dispatch(setDropdownOption(value));
//   };
//   const handlework=(value)=>{
//     dispatch(setDropdownOptionwork(value));
//   }
//   const handleDesig=(value)=>{
//     dispatch(setDropdownOptionDesig(value));
//   }
//   const handlReportk=(value)=>{
//     dispatch(setDropdownOptionReport(value));
//   }
//   const handleDateChange = (date, dateString) => {
//     // Dispatch the action to update the selectedDate in the Redux store
//     dispatch(setSelectedDate(dateString));
//   };
//   const dispatch = useDispatch();
//   const professionalDetails = useState({

//   })
//   const [form] = useForm();

//   const handleChange = (name, value) => {
//     // console.log(name,value)
//     dispatch(updateProfessionalDetails({ [name]: value }));
//   };

//   const handleSubmit = (values) => {
//     console.log('first',values)
//     dispatch(updateProfessionalDetails(professionalDetails))
//     console.log(professionalDetails);
//     putting(professionalDetails)
    
//   };
//   const router = useRouter();
//   const prof1=["option1","option2","option3"]
//   const prof=["option1","option2","option3"]
 

//   const putting = async (values) => {
//     let data = {
//       // designation_id: values.selectedDesignation,
//       designation_id: 4,
//       pf: values.pfNumber,
//       uan: values.uanNumber,
//       // department_id: values.selectedDepartment,
//       department_id:5,
//       // reporting_manager_id: values.selectedReportingMngr,
//       reporting_manager_id:'61a6b732-1597-444a-afcc-10eeafbacc63',
//       work_location: values.selectedworkLocation,
//       start_date: values.selectedDate,
//       emp_id: values.employeeId,
//     };

//     try{
//       console.log('stored data',data)
//       const response = await axios.put("/employee/professionalInfo", data)
//       console.log("success", response);

//     }  
//     catch(error){
//         console.log("error", error);
//       }
//   };

  
//   const  selectedDepartment = useSelector((state) => state.selectedDepartment);
//   const  selectedDesignation = useSelector((state) => state.selectedDesignation);
//   const  selectedReportingMngr = useSelector((state) => state.selectedReportingMngr);
//   const  selectedworkLocation = useSelector((state) => state.selectedworkLocation);
//   const selectedDate = useSelector((state) => state.selectedDate);

//   return (
//     <div>
//       <Form
      
//         requiredMark={false}
//         style={{
//           padding: "50px",
//           text:"start"
//         }}
//         initialValues={professionalDetails}
//         labelAlign="left"
      
//         labelCol={{
//           span: 5,
//         }}
//          labelWrap
//         className="m-20 w-[90%] rounded-none"
//         onFinish={handleSubmit}
//       >
//         <Col span="3xl">
//         <Form.Item
//           className="rounded-none "
//           label="Designation"
//           name="designation"
          
//           labelWrap


//           rules={[{ required: true, message: "Please select a designation." }]}
          
//         >
//           <Select
//             showSearch
//             className="rounded-none"
//             onChange={handleDesig}
//             value={selectedDesignation}
//             placeholder="Select Designation"
//             optionFilterProp="children"
//             filterOption={(input, option) =>
//               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//           >
//             {prof1.map((option) => (
//               <Select.Option
//                 key={option}
//                 value={option}
//                 className="rounded-none"
//               >
//                 {option}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         </Col>

//         <Row gutter={30}
//         >
//         <Col span={12}>
          
//             <Form.Item
//               label="PF No (Optional)"
//               name="pfNumber"
//               rules={[
//                 { message: "Enter Your PF Number" },
//                 {
//                   pattern: numberRegex,
//                   message: "Please enter at least 5 digits for PF number.",
//                 },
//               ]}
//               labelCol={{ span:10}}
              
//             >
//               <Input
//                 placeholder="Enter your PF number"

             
//                 type="text"
//                 value={professionalDetails.pfNumber}
//                 style={{width:"100%", marginLeft:"3%"}}
//                 onChange={(e) => handleChange("pfNumber", e.target.value)}
//               />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
            
//               label="UAN No (Optional)"
//               name="uanNumber"
//               // className="ml-20"
//               style={{ marginLeft: '30px' }}
//               rules={[
//                 { message: "Enter Your UAN Number" },
//                 {
//                   pattern: numberRegex,
//                   message: "Please enter at least 5 digits for UAN number.",
//                 },
//               ]}
//               labelCol={{ span: 8}}
//             >
//               <Input
                
//                 placeholder="Enter Your UAN Number"
              
//                 type="text"
//                 value={professionalDetails.uanNumber}
//                 onChange={(e) => handleChange("uanNumber", e.target.value)}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Col span="3xl">
//         <Form.Item
//           label="Employee ID (Optional)"
//           name="employeeId"
//           rules={[
//             { message: "Enter Your Employee ID" },
//             {
//               // pattern: numberRegex,
//               message: "Please enter at least 5 digits for UAN number.",
//             },
//           ]}
//         >
//           <Input
//             placeholder="Enter Your Employee ID"
            
//             type="text"
//             value={professionalDetails.employeeId}
//             onChange={(e) => handleChange("employeeId", e.target.value)}
//           />
//         </Form.Item>
//         </Col>
//         <Col span="3xl">
//         <Form.Item
//           className="rounded-none"
//           label="Department"
//           name="department"
//           rules={[{ required: true, message: "Please select a department." }]}
//         >
//           <Select
//             showSearch
//             style={{ borderRadius: 0 }}
//             className="rounded-none"
//             onChange={handleSelectChange}
//             value={selectedDepartment}
//             placeholder="Select Department "
//             optionFilterProp="children"
//             filterOption={(input, option) =>
//               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//           >
//             {prof.map((option) => (
//               <Select.Option key={option} value={option}>
//                 {option}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         </Col>
//         <Col span="3xl">        <Form.Item
    
//           label=" Direct Reporting Manager"
//           name="reportingManager"
//           rules={[
//             { required: true, message: "Please select a reporting manager." },
//           ]}
//         >
//           <Select
//             showSearch
//             style={{borderRadius: 0 }}
//             className="rounded-none"
//             onChange={handlReportk}
//             value={selectedReportingMngr}
//             placeholder="Select Reporting Manager "
//             optionFilterProp="children"
//             filterOption={(input, option) =>
//               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//           >
//             {prof.map((option) => (
//               <Select.Option key={option} value={option}>
//                 {option}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         </Col>
//         <Col span="3xl">   
//           <Form.Item
        
//           label="Work Location"
//           name="workLocation"
//           rules={[
//             { required: true, message: "Please select a work location." },
//           ]}
//         >
//           <Select
//             showSearch
//             style={{ borderRadius: 0 }}
//             className="rounded-none"
//             onChange={handlework}
//             value={selectedworkLocation}
//             placeholder=" Select Work Location "
//             optionFilterProp="children"
//             filterOption={(input, option) =>
//               option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//             }
//           >
//             {prof.map((option) => (
//               <Select.Option key={option} value={option}>
//                 {option}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//         </Col>
//        <Col span="3xl">
//         <Form.Item
          
//           label="Started Date"
//           name="Date"
//           rules={[{ message: "Please select a  Date" }]}
         
//         >
//           <Space direction="vertical"
//            style={{ width:"100%"}}>
//             <DatePicker
//              style={{ width:"100%"}}
          
//               onChange={handleDateChange}
//               value={selectedDate}
            
              
//             />
//           </Space>
//         </Form.Item>
//         </Col>
       
//         {/* <Form.Item
//         style={{display:"flex" , justifyContent:"center"}}>
//           <Col span={24}>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className=" bg-[#1890ff]"
//             style={{borderRadius:"0" , height:"40px", width:"500%",marginLeft:"20%"}}
//           >
//             Next
//           </Button>
//           </Col>
         
//         </Form.Item> */}
//             <Row gutter={16}>
//       {/* Other columns */}
//       <Col span={18}>
//         <Button
//           type="primary"
//           htmlType="submit"
//           className="bg-[#1890ff]"
//           style={{ borderRadius: "0", height: "40px", width: "80%",display:"flex", justifyContent:"center", marginLeft:"40%"}}
//           onClick={()=>{setTab(tab+1)}}
//           >
        
//           Next
//         </Button>
//       </Col>
//     </Row>
        


//         {/* <Form.Item>
//           <Button
//             type="primary"
//             htmlType="button"
//             className="rounded-md w-20 h-8 bg-blue-600"
//           >
//             <Link href="/ProfReview">Review</Link>
//           </Button>
//         </Form.Item> */}
//       </Form>
//     </div>
//   );
// };

// export default ProfessionalInfo;
"use client";

// ProfessionalForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select, Col, Row, DatePicker, Space } from "antd";
import {setProfessionalDetails} from "../../../../redux/slices/profDetails";

const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits
import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";


const ProfessionalInfo = ({ tab, setTab }) => {
  const [formData, setFormData] = useState({}); 

  const dispatch = useDispatch();
  const professionalDetails = useSelector((state) => state.Details); 

  const handleDropDownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(name, value, "change");
  };
  const dateHandle = (name, value) => {
    const dateValue = value ? value.format("YYYY-MM-DD") : "";
    setFormData({ ...formData, [name]: dateValue });
    console.log(name, dateValue, "change");
  };
  // const handleInputChange = (name, value) => {
  //   console.log("form data", formData);
  //   setFormData({ ...formData, [name]: value });
  //   console.log(name, value, "change");
  // };
  const handleInputChange = (e) => {
    console.log("form data", formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value, "change");
  };
  console.log('data',formData)
  const prof1 = ["option1", "option2", "option3"];
  const prof = ["option1", "option2", "option3"];
  
  
  const accessToken = getAccessTokenFromCookie();

    const handleSubmit = async () => {

      let data = {
      designation_id: 4,
      pf: formData.pf,
      uan: formData.uan,
      department_id:5,
      reporting_manager_id: "61a6b732-1597-444a-afcc-10eeafbacc63",
      work_location: formData.work_location,
      start_date: formData.start_date,
      emp_id:formData.emp_id,
    };

    try {
      console.log("stored data", data);
      const response = await axios.put("/employee/professionalInfo", data,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
      console.log("success", response);
      if (response.status === 200) {
        console.log("response data", response.data)
        dispatch(setProfessionalDetails(response.data));
      }
    } catch (error) {
      console.log("error", error);
    }
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
              onChange={(value) => handleDropDownChange("designation_id", value)}
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
            <Input
              name="emp_id"
              placeholder="Enter Your Employee ID"
               />
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
              onChange={(value) => handleDropDownChange("reportingManager", value)}           
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
              onClick={() => {
                setTab(tab + 1);
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