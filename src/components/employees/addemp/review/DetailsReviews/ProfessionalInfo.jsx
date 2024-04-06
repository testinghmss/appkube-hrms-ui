// 'use client'
// import React, { useState, useEffect } from 'react'
// import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import { useSelector } from 'react-redux';
// // import axios from "@/api/axios"
// import axios from '@/api/axios'

// const ProfessionalInfo = () => {
//   const [fetchedData , setFetchData] = useState({})
//   const accessToken = getAccessTokenFromCookie();
  
//   const [empdata, setempdata] = useState({})
//  console.log(empdata,'this is empdata')
// //  const id = useSelector((state)=>state.Details.ParticularempId)

//    useEffect(()=>{
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
//           setempdata(empdetails.data.professional_information
//             )

//         }
//         catch(error){
//           console.log('error',error);
//         }
//       }
//       fetchData()
//     },[])


//     // getting data from redux using useselector


//   const reduxData = useSelector(state => state.Details?.professionalDetails)
//   console.log('redux data for professional info',reduxData)
//   console.log('fetched data by id for professional info',fetchedData)
//   // setData(reduxData)

//     // condittionally rendering the data eitther from redux or from fetched  data by id 

//   const data = reduxData.length > 0 ? reduxData : fetchedData;
//   console.log("data of profesional details",data)
//   return (
//     <div className="grid grid-cols-2 grid-rows-3 ">
//       {/* first row  */}
//       <span className="mb-4">
//         <h2 className="text-gray-400">Designation</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.emp_designation) ? (empdata.emp_designation) : 'no value'
//         empdata && empdata.emp_designation
//         }</p>
//       </span>
//       <span>
//         <h2 className="text-gray-400">Department</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.department_name) ? (empdata.department_name) : 'no value'
//         empdata && empdata.department_name
//         }</p>
//       </span>

//       {/* second row  */}
//       <span className="mb-4">
//         <h2 className="text-gray-400">PF Number</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.pf) ? (empdata.pf) : 'no value'
//         empdata && empdata.empdata.pf
//         }</p>
//       </span>
//       <span>
//         <h2 className="text-gray-400">UAN Number</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.uan) ? (empdata.uan) : 'no value'
//         empdata && empdata.uan
        
//         }</p>
//       </span>

//       {/* third row  */}
//       <span className="mb-4">
//         <h2 className="text-gray-400">Direct Reporting Manager</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.reporting_manager_first_name && empdata.reporting_manager_last_name) ? (empdata.reporting_manager_first_name && empdata.reporting_manager_last_name) : 'no value'
        
//         empdata && empdata.reporting_manager_first_name
//         }
        
//         </p>
//       </span>
//       <span>
//         <h2 className="text-gray-400">Work location</h2>
//         <p className="font-semibold text-base">{
//         // (empdata.work_location) ? (empdata.work_location) : 'no value'
//         empdata &&empdata.work_location
//         }</p>
//       </span>

//     </div>
//   )
// }

// export default ProfessionalInfo
'use client'
import React, { useState, useEffect } from 'react';
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from '@/api/axios';

const ProfessionalInfo = () => {
  const [empdata, setEmpData] = useState({});
  const accessToken = getAccessTokenFromCookie();
  
  console.log(empdata, 'from professional')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empId = localStorage.getItem("empId");
        const empdetails = await axios.get(`/employee/${empId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmpData(empdetails.data.professional_information);
      } catch(error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-3 ">
      {empdata && Object.keys(empdata).length > 0 && (
        <>
          <span className="mb-4">
            <h2 className="text-gray-400">Designation</h2>
            <p className="font-semibold text-base">{empdata.emp_designation}</p>
          </span>
          <span>
            <h2 className="text-gray-400">Department</h2>
            <p className="font-semibold text-base">{empdata.department_name}</p>
          </span>

          <span className="mb-4">
            <h2 className="text-gray-400">PF Number</h2>
            <p className="font-semibold text-base">{empdata.pf}</p>
          </span>
          <span>
            <h2 className="text-gray-400">UAN Number</h2>
            <p className="font-semibold text-base">{empdata.uan}</p>
          </span>

          <span className="mb-4">
            <h2 className="text-gray-400">Direct Reporting Manager</h2>
            <p className="font-semibold text-base">{`${empdata.reporting_manager_first_name} ${empdata.reporting_manager_last_name}`}</p>
          </span>
          <span>
            <h2 className="text-gray-400">Work location</h2>
            <p className="font-semibold text-base">{empdata.work_location}</p>
          </span>
        </>
      )}
    </div>
  );
}

export default ProfessionalInfo;
