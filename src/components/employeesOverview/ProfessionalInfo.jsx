import React, { useState, useEffect } from 'react'
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import { useSelector } from 'react-redux';
import axios from "@/api/axios"

const ProfessionalInfo = () => {
  const [fetchedData , setFetchData] = useState({})
  const accessToken = getAccessTokenFromCookie();
  // const empId =  localStorage.getItem('empId')
  // console.log('emmpid from localstorage',empId)
  useEffect(()=>{
    console.log('in useeffect')
    const fetchData = async ()=>{
      const id = await localStorage.getItem('empId')
      // setEmpId(id)
      try{
        console.log('employee id from local storage',id)
        const response = await axios.get(`/employee/${id}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log("response of employee id",response.data.professional_information)
        setFetchData(response.data.professional_information);
        // console.log("data",employees)
      }
      catch(error){
        console.log('error fetching employee',error);
      }
    }
    fetchData()
  },[])

  const reduxData = useSelector(state => state.Details?.professionalDetails)
  console.log('redux data for professional info',reduxData)
  console.log('fetched data by id for professional info',fetchedData)
  // setData(reduxData)
  const data = reduxData.length > 0 ? reduxData : fetchedData;
  console.log("data of profesional details",data)
  return (
    <div className="grid grid-cols-2 grid-rows-3 ">
      {/* first row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Designation</h2>
        <p className="font-semibold text-base">{(data.emp_designation) ? (data.emp_designation) : 'no value'}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Department</h2>
        <p className="font-semibold text-base">{(data.department_name) ? (data.department_name) : 'no value'}</p>
      </span>

      {/* second row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">PF Number</h2>
        <p className="font-semibold text-base">{(data.emp_pf) ? (data.emp_pf) : 'no value'}</p>
      </span>
      <span>
        <h2 className="text-gray-400">UAN Number</h2>
        <p className="font-semibold text-base">{(data.uan) ? (data.uan) : 'no value'}</p>
      </span>

      {/* third row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Direct Reporting Manager</h2>
        <p className="font-semibold text-base">{(data.reporting_manager_last_name) ? (data.reporting_manager_first_name  ,data.reporting_manager_last_name) : 'no value'}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Work location</h2>
        <p className="font-semibold text-base">{(data.work_location) ? (data.work_location) : 'no value'}</p>
      </span>

    </div>
  )
}

export default ProfessionalInfo