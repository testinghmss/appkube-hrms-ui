// 'use client'
// import React from 'react';
// import { SendEmail } from './Profile3';
// import axios from '@/api/axios';
// import getAccessTokenFromCookie from '@/utils/getAccessToken';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// const Profile2 = ({ step, setStep }) => {
   
//   const router = useRouter()
//     const accessToken = getAccessTokenFromCookie()


    
//  const [empdata, setempdata] = useState({})
//  console.log(empdata,'this is empdata')
  

//   useEffect(()=>{
//     const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
//   console.log(empId, 'from localStorage')
//       const fetchData = async ()=>{
//         try{
//           const empdetails = await axios.get(`/employee/${empId}`,{
  
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
         
//           // console.log("data",employees)
//           setempdata(empdetails.data, 'this is data from profile2')
  
//         }
//         catch(error){
//           console.log('error',error);
//         }
//       }
//       fetchData()
//     },[])

//     //  const SendEmail = async()=>{
        
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


  
//     const SendEmail = async () => {
//       const empId = localStorage.getItem("empId");
//       try {
//         const response = await axios.get(`/invite/${empId}`, {
//           headers: {
//             'Accept': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           }
//         });
//         console.log(JSON.stringify(response.data));
//         if (response.status === 200) {
//           localStorage.setItem('empId', '');
//           // Set empId to an empty string
//           router.push('/hrms');
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     const handleConfirmAndContinue = () => {
//       // Call the SendEmail function when the button is clicked
//       SendEmail();
//     };

//     return (
//         <>
//             {/* <div className='flex flex-col items-center  bg-white w-[45vw] '> */}
//             <h2 className='text-center font-semibold text-2xl mb-5'>Create profile and invite</h2>
//             <p className='text-center text-md font-medium mb-4'>when do you want {empdata && empdata.personal_information.first_name + empdata.personal_information.last_name
//   } to receive an invitation to join </p>

//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Employee Name</p>
//                 <p>{empdata && empdata.personal_information.first_name + empdata.personal_information.last_name
//   }</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Designation</p>
//                 <p>{empdata && empdata.professional_information.emp_designation}</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Email Address</p>
//                 <p>{empdata && empdata.work_email}</p>
//             </div>
//             <div className='flex justify-between font-normal text-md mb-3 bg-gray-200 p-3'>
//                 <p className=' text-gray-400'>Invitation</p>
//                 <p>Immediately</p>
//             </div>
//             <button className='bg-[#1890FF] w-[100%] mb-5 h-9 rounded-sm  text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]'onClick={handleConfirmAndContinue} >Confirm and Continue</button>
//             <p className='mb-5 cursor-pointer text-center' onClick={() => { setStep(step - 1) }} >Back</p>
//             {/* </div> */}
//         </>
//     );
// }

// export default Profile2;



'use client'
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import { useRouter } from 'next/navigation';

const Profile2 = ({ step, setStep }) => {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();

  const [empdata, setEmpData] = useState({});
  console.log(empdata, 'this is empdata');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empId = localStorage.getItem('empId');
        const empdetails = await axios.get(`/employee/${empId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmpData(empdetails.data, 'this is data from profile2');
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const SendEmail = async () => {
    const empId = localStorage.getItem('empId');
    try {
      const response = await axios.get(`/invite/${empId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(JSON.stringify(response.data));
      if (response.status === 200) {
        localStorage.setItem('empId', '');
        router.push('/hrms');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmAndContinue = () => {
    SendEmail();
  };

  return (
    <>
      <h2 className="text-center font-semibold text-2xl mb-5">Create profile and invite</h2>
      <p className="text-center text-md font-medium mb-4">
        When do you want {empdata.personal_information?.first_name && empdata.personal_information?.last_name
          ? `${empdata.personal_information.first_name} ${empdata.personal_information.last_name}`
          : 'the employee'
        } to receive an invitation to join
      </p>
      <div className="flex justify-between font-normal text-md mb-3 bg-gray-200 p-3">
        <p className="text-gray-400">Employee Name</p>
        <p>
          {empdata.personal_information?.first_name && empdata.personal_information?.last_name
            ? `${empdata.personal_information.first_name} ${empdata.personal_information.last_name}`
            : 'N/A'
          }
        </p>
      </div>
      <div className="flex justify-between font-normal text-md mb-3 bg-gray-200 p-3">
        <p className="text-gray-400">Designation</p>
        <p>{empdata.professional_information?.emp_designation || 'N/A'}</p>
      </div>
      <div className="flex justify-between font-normal text-md mb-3 bg-gray-200 p-3">
        <p className="text-gray-400">Email Address</p>
        <p>{empdata.personal_information?.work_email || 'N/A'}</p>
      </div>
      <div className="flex justify-between font-normal text-md mb-3 bg-gray-200 p-3">
        <p className="text-gray-400">Invitation</p>
        <p>Immediately</p>
      </div>
      <button className="bg-[#1890FF] w-[100%] mb-5 h-9 rounded-sm text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF]" onClick={handleConfirmAndContinue}>Confirm and Continue</button>
      <p className="mb-5 cursor-pointer text-center" onClick={() => { setStep(step - 1) }}>Back</p>
    </>
  );
}

export default Profile2;
