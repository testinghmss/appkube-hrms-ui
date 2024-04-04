
import React, { useEffect, useState } from 'react'
import EquipmentCard from './EquipmentCard'
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import { useSelector } from 'react-redux';

const EquipmentDetails = () => {
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
        console.log("response of employee id",response.data.equipment)
        setFetchData(response.data.equipment);
        // console.log("data",employees)
      }
      catch(error){
        console.log('error fetching employee',error);
      }
    }
    fetchData()
  },[accessToken])

  const reduxData = useSelector(state => state.professionalDetails)
  console.log('redux data for equipments ',reduxData)
  console.log('fetched data by id for equipments ',fetchedData)
  // setData(reduxData)
  const data = reduxData.length > 0 ? reduxData : fetchedData;
  console.log("data ofequipments details",data)
  return (
    <div className='flex flex-wrap gap-5 p-4'> 
        <EquipmentCard/>
        {/* <EquipmentCard/> */}
        {/* <EquipmentCard/> */}
        {/* <EquipmentCard/> */}
        {/* <EquipmentCard/> */}
    </div>
  )
}

export default EquipmentDetails