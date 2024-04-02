'use client'
import LeftNav from '@/components/employeesOverview/LeftNav'
import TopEmpDt from '@/components/employeesOverview/TopEmpDtl'
import getAccessTokenFromCookie from '@/utils/getAccessToken'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from "@/api/axios"
const Page = () => {
  const searchParams = useSearchParams();
  const userId =  searchParams.get('id')
  console.log('id from  params',userId)
  const [fetchedData , setFetchData] = useState({})
  const accessToken = getAccessTokenFromCookie();
  
  useEffect(()=>{
    console.log('in useffect')
    const fetchData = async ()=>{
      // setEmpId(id)
      try{
        // const id = await localStorage.getItem('empId')
        console.log('employee id from local storage',userId)
        const response = await axios.get(`/employee/${userId}`,{
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
  },[setFetchData])

  // const reduxData = useSelector(state => state.professionalDetails)
  // console.log('redux data for equipments ',reduxData)
  console.log('fetched data by id for overview ',fetchedData)
  // setData(reduxData)
  // const data = reduxData.length > 0 ? reduxData : fetchedData;
  console.log("data of employee details",data)
  return (
    <div >
        <TopEmpDt  empData={fetchedData}/>
        <LeftNav  empData={fetchedData}/>
    </div>
  )
  
}

export default Page