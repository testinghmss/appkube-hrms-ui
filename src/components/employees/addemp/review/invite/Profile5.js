'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '@/api/axios'
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import { SendEmail } from './Profile3';
import { useRouter } from 'next/navigation';
const Profile5 = ({ step, setStep }) => {
 const router = useRouter()
    const [empdata, setempdata] = useState({})
    console.log(empdata,'this is empdata')
     
   
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
             setempdata(empdetails.data)
     
           }
           catch(error){
             console.log('error',error);
           }
         }
         fetchData()
       },[])
   

    const handleBack = () => {
        setStep(step - 1); // Move back to the previous step
    };


    return (
        <>
            {/* <div className='flex flex-col items-center  bg-white w-[45vw] '> */}
            <h2 className='text-center font-semibold text-2xl mb-5'>Create profile and invite</h2>
            <p className='text-center text-md font-medium mb-4'>when do you want james harper to receive an invitation to join </p>

            <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
                <p className=' text-gray-400'>Employee Name</p>
                <p>James harper</p>
            </div>
            <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
                <p className=' text-gray-400'>Designation</p>
                <p>UI/UX Designer</p>
            </div>
            <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
                <p className=' text-gray-400'>Email Address</p>
                <p>Jamesharper@synectiks.com</p>
            </div>
            <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
                <p className=' text-gray-400'>Invitation</p>
                <p>Schedule invite
                </p>
            </div>
            <button className='bg-[#1890FF] w-[100%] mb-5 h-9 rounded-sm text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]' onClick={()=>{ router.push('/hrms')

            }} >Confirm and Continue</button>
            <p className='mb-5 cursor-pointer text-center' onClick={handleBack} >Back</p>
            {/* </div> */}
        </>
    );
}

export default Profile5;
