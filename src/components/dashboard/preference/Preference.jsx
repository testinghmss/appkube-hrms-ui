"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalDetail from "./personaldetails/Personaldetail";
// import Orgdetails from "@/components/dashboard/preference/organization/organizationdetails/Orgdetails";
// import Orgdetails from "./organization/organizationdetails/orgdetails";
import Organizationdetails from "./organization/Organizationdetails";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios"
const Preference = () => {
  const [isClient, setIsClient] = useState(false);
  const [fetchedData , setFetchData] = useState([])
  const accessToken = getAccessTokenFromCookie();
  useEffect(() => {
    setIsClient(true);
  },[])
  useEffect(()=>{
    console.log('in useffect')
    if( isClient ){
      // const searchParams = useSearchParams();
      // const userId =  searchParams.get('id')
      const hrId = localStorage.getItem('hrId'); 
      console.log('Hr id from  localstorage',hrId)
      const fetchData = async ()=>{
        // setEmpId(id)
        try{
          // const id = await localStorage.getItem('empId')
          // console.log('employee id from local storage',userId)
          const response = await axios.get(`/employee/${hrId}`,{
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log("response of employee data for overview",response.data)
          setFetchData(response.data);
          // console.log("data",employees)
        }
        catch(error){
          console.log('error fetching employee data',error);
        }
      }
      fetchData()
    }
  },[accessToken,isClient])
  
  console.log('fetched hr data',fetchedData)
  return (
    <Tabs defaultActiveKey="1" className="px-2">
      <Tabs.TabPane tab="Personal Informaton" key="1">
        <PersonalDetail fetchedData={fetchedData.personal_information}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Organizational Information" key="2">
        <Organizationdetails />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Security " key="3" disabled></Tabs.TabPane>
      <Tabs.TabPane tab="Notifications " key="4" disabled></Tabs.TabPane>
    </Tabs>
  );
};

export default Preference;
