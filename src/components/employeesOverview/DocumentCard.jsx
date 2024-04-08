'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { CiSaveDown1 } from "react-icons/ci";
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const DocumentCard = () => {

    const accessToken = getAccessTokenFromCookie();
    const [documents, setdocuments] = useState([]);

    
   
    // const empId = typeof window !== 'undefined' ? localStorage.getItem('empId') : null;
    const id = useSelector((state)=>state.Details.ParticularempId)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const empDetails = await axios.get(`/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                  console.log(empDetails, 'from documents')
                setdocuments(empDetails.data.documents);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, [id, accessToken]);
  


  return (
    <div className='flex items-center justify-between w-[22%] p-3 rounded-lg border border-gray-400'>
         {documents && documents.map((document, index) => (
        <div key={index}>
          <h3>{document?.name}</h3>
          <Image src={document?.url} alt={document?.name}  width={100} height={100} />
        </div>
      ))}
    </div>  )
}

export default DocumentCard