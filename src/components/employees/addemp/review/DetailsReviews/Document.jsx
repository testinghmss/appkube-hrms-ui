'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import DocumentCard from './DocumentCard';
import axios from '@/api/axios';
import { UseSelector } from 'react-redux';
import getAccessTokenFromCookie from '@/utils/getAccessToken';


const Document = () => {

  const accessToken = getAccessTokenFromCookie()
  const [data, setdata] = useState()
  const id =  localStorage.getItem('empId')
  
  const sendDoc = data?.map((e)=>e);

  console.log('sendDoc', sendDoc)
  
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
        // console.log("response of employee id for document", response.data.personal_information);
        console.log("response of employee id for document", response.data);

        // storing equipment data into state
      //   setFetchData(prevData => ({...prevData, equipment: response.data.equipment}));
      setdata(response.data.documents)
  
      //   // fetching data by employee id in case of data not found in redux
      //   const response2 = await axios.get(`/employee/${id}`, {
      //     headers: {
      //       'Authorization': `Bearer ${accessToken}`,
      //     },
      //   });
      //   console.log("response of employee id for documents", response2.data.documents);
      //   // storing equipment data into state
      //   setFetchData(prevData => ({...prevData, documents: response2.data.documents}));
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