import React from 'react'
import { useEffect,useState } from 'react';
import DocumentCard from './DocumentCard';
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';
const Document = () => {
  const accessToken = getAccessTokenFromCookie()

  const [data, setdata] = useState()
  const id =  localStorage.getItem('empId')
  
  useEffect(() => {
    console.log('in useeffect');
    const fetchData = async () => {
      try {
        console.log('employee id from local storage', id);
        // fetching data by employee id in case of data not found in redux
        const response = await axios.get(`/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response of employee id for equipments", response.data.personal_information);
        console.log("response of employee id for equipments", response.data);

        // storing equipment data into state
      //   setFetchData(prevData => ({...prevData, equipment: response.data.equipment}));
      setdata(response.data.documents)
  
      } 
      catch (error) {
        console.log('error fetching employee data', error);
      }
    };
    fetchData();
  }, [id, accessToken]);


  return (
    <div className='flex flex-wrap gap-10 mt-4'>
      <DocumentCard/>
     
    </div>
  )
}

export default Document