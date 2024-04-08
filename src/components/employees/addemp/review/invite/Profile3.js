'use client'
import React from 'react';
import axios from '@/api/axios'
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import { useEffect, useState } from 'react';
import { fetchData } from './Profile1';
import { useRouter } from 'next/navigation';

// export const SendEmail = async()=>{
//       // const router = useRouter()

//   // const accessToken = getAccessTokenFromCookie();
  
//   // console.log('hello from invite')
//   // const empId = localStorage.getItem("empId");
//   // console.log(empId,'empId')
  
  
//   try {
//     const response = await axios.get(`/invite/${empId}`, {
//           headers: {
//             'Accept': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
            
//           }
//         });
//         console.log(JSON.stringify(response.data));
//         if (response.status === 200) {
//           localStorage.setItem('empId', '');
//           // Set empId to an empty string
//           // router.push('/hrms')
//         }
        
//       } catch (error) {
//         console.log(error);
//       }
      
      
      
//     }
//     const Profile3 = ({ step, setStep }) => {
//       const accessToken = getAccessTokenFromCookie();

 
//     const [EmpData, setEmpData] = useState([])

//     useEffect(()=>{
//     const empId = localStorage.getItem("empId");
    

//     fetchData()
//     console.log(fetchData, 'this is fetch data')
//       },[])




    

//     // const SendEmail = async()=>{
        
//     //     console.log('hello from invite')
//     //     const empId = localStorage.getItem("empId");
//     //     console.log(empId,'empId')
        
        
//     //     try {
//     //         const response = await axios.get(`{{baseUrl}}/invite/${empId}`, {
//     //           headers: {
//     //             'Accept': 'application/json'
//     //           }
//     //         });
//     //         console.log(JSON.stringify(response.data));
//     //       } catch (error) {
//     //         console.log(error);
//     //       }
          


//     // }
//     return (
//         <>
//             {/* <div className='flex flex-col items-center  bg-white w-[45vw] '> */}
//             <h2 className='text-center font-semibold text-2xl mb-5'>Create profile and invite</h2>
//             <p className='text-center text-md font-medium mb-4'>when do you want james harper to receive an invitation to join </p>

//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Employee Name</p>
//                 <p>James harper</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Designation</p>
//                 <p>UI/UX Designer</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Email Address</p>
//                 <p>Jamesharper@synectiks.com</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Invitation</p>
//                 <p>Not Now</p>
//             </div>
//             <button className='bg-[#1890FF] w-[100%] mb-5 h-9 rounded-sm text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]' onClick={()=>{SendEmail()}} >Confirm and Continue</button>
//             <p className='mb-5 cursor-pointer text-center' onClick={() => { setStep(step - 2) }} >Back</p>
//             {/* </div> */}
//         </>
//     );
// }

// export default Profile3;



const Profile3 = ({ step, setStep }) => {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();
  const [EmpData, setempdata] = useState([]);

  const SendEmail = async () => {
    // const empId = localStorage.getItem("empId");
    // try {
    //   const response = await axios.get(`/invite/${empId}`, {
    //     headers: {
    //       'Accept': 'application/json',
    //       Authorization: `Bearer ${accessToken}`,
    //     }
    //   });
    //   console.log(JSON.stringify(response.data));
    //   setempdata(empdetails.data.personal_information)
    //   if (response.status === 200) {
    //     localStorage.setItem('empId', '');
    //     // Set empId to an empty string
        router.push('/hrms');
      // }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleConfirmAndContinue = () => {
    // Call the SendEmail function when the button is clicked
    SendEmail();
  };

  return (
    <>
      <h2 className='text-center font-semibold text-2xl mb-5'>Create profile and invite</h2>
      <p className='text-center text-md font-medium mb-4'>When do you want {EmpData.first_name} to receive an invitation to join?</p>
      {/* Rest of your component */}

      <button className='bg-[#1890FF] w-[100%] mb-5 h-9 rounded-sm text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]' onClick={handleConfirmAndContinue}>Confirm and Continue</button>
      <p className='mb-5 cursor-pointer text-center' onClick={() => { setStep(step - 2) }} >Back</p>
    </>
  );
}

export default Profile3;
