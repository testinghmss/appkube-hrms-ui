'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { CiSaveDown1 } from "react-icons/ci";
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import axios from '@/api/axios';
import Image from 'next/image';

const DocumentCard = () => {
    const accessToken = getAccessTokenFromCookie();
    const [documents, setdocuments] = useState([]);

    
   
    const empId = typeof window !== 'undefined' ? localStorage.getItem('empId') : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empDetails = await axios.get(`/employee/${empId}`, {
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
    }, [empId, accessToken]);
  


  return (
    <div className='flex items-center justify-between w-[22%] p-3 rounded-lg border border-gray-400'>

        

{/* <p className='text-md font-medium'>{doc?.name}</p>
        <span className='flex gap-2'>
            <FiEye className='text-lg '/>
            <CiSaveDown1 className='text-lg font-bold'/>
        </span>
        </div> */}
        {documents && documents.map((document, index) => (
        <div key={index}>
          <h3>{document?.name}</h3>
          <Image src={document?.url} alt={document?.name}  width={100} height={100} />
        </div>
      ))}
        
        
    </div>  
  )
        }
export default DocumentCard


