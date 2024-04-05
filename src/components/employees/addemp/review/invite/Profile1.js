import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Radio,
  Space,
  DatePicker,
  Form,
  TreeSelect,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import axios from '@/api/axios'
import {  useSelector } from "react-redux";
import getAccessTokenFromCookie from "@/utils/getAccessToken";



export const fetchData = async ()=>{

const accessToken = getAccessTokenFromCookie()
    const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
             
  try{

    const response = await axios.get(`/employee/${empId}`,{
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`,

          }}
    );
    console.log("empdetails",response.data)
    // storing equipment data intto usestate
  // setEmpData(...EmpData, response.data)
  
  
    
  }
  catch(error){
    console.log('error fetching employee data',error);
  }
}
// fetchData()


const Profile1 = ({ step, setStep }) => {

 const [empdata, setempdata] = useState({})
 console.log(empdata,'this is empdata')
  
const accessToken = getAccessTokenFromCookie()

  useEffect(()=>{
    const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
  console.log(empId, 'from localStorage')
      const fetchData = async ()=>{
        try{
          const empdetails = await axios.get(`/employee/${empId}`,{
  
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
         
          // console.log("data",employees)
          setempdata(empdetails.data.personal_information)
  
        }
        catch(error){
          console.log('error',error);
        }
      }
      fetchData()
    },[])

 

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
  };

  // const id= useSelector((state)=>state.SendpersonalDetails.personalDetails)
  

  // console.log(id)
  // const empId = localStorage.getItem("empId");
  // console.log(empId,'empId')

  // const id = useSelector(state => state.Details?.equipDetails.id)
  // console.log(id)

 

  return (
    <>
      <div className="">
        <p className="text-center font-medium text-2xl ">
          Create profile and invite
        </p>
        {/* <p className="text-center">
          when do you want {empdata.personal_information.first_name} to receive an invitation to join
        </p> */}
        {empdata.first_name && (
  <p className="text-center">
    when do you want {empdata.first_name} to receive an invitation to join
  </p>
)}
        <Radio.Group onChange={onChange} className="">
          <Space direction="vertical" className="mt-8">
            <div className=" border-1 w-[470px] p-2 rounded-md ">
              {" "}
              <Radio
                value={1}
                onChange={() => {
                  if (step == 4) setStep(1);
                  else setStep(step + 1);

                }}
              >
                Immediately
              </Radio>
            </div>
            <div className=" border-1 w-[470px] p-2 rounded-md ">
              {" "}
              <Radio
                value={2}
                onChange={() => {
                  if (step == 4) setStep(2);
                  else setStep(step + 2);
                }}
              >
                Not Now
              </Radio>
            </div>
            <div className=" border-1 w-[470px] p-2 rounded-md ">
              {" "}
              <Radio
                value={3}
                onChange={() => {
                  if (step == 4) setStep(4);
                  else setStep(step + 3);
                  fetchData()
                }}
              >
                Schedule invite
              </Radio>
            </div>
          </Space>
        </Radio.Group>
        {step === 4 && (
          <>
            <div className="bg-green-200 my-3 w-[100%] rounded-sm">
              <p className="pl-4 p-2">
              {empdata.first_name} 
              {/* start date is feb 28th, 2024 ! */}
                

              </p>
            </div>
            <Form.Item>
              <DatePicker placeholder="24/01/2024 " className=" p-2 w-[100%]" />
            </Form.Item>
            <Form.Item>
              <TreeSelect />
            </Form.Item>
            <Space className="w-[100%] " wrap>
              <TimePicker
                defaultValue={dayjs("12:08", "HH:mm")}
                size="large"
                className="w-[475px]"
              />
            </Space>
          </>
        )}
      </div>
    </>
  );
};

export default Profile1;