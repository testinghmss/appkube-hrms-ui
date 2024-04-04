import React from 'react'
import { useEffect, useState } from 'react';
import { MdKeyboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from '@/api/axios'
import getAccessTokenFromCookie from '@/utils/getAccessToken';


const EquipmentCard = () => {
    const accessToken = getAccessTokenFromCookie()

 const [organizationDetails, setempdata] = useState([])
    const id = useSelector((state)=>state.Details.ParticularempId)
console.log(organizationDetails,'organizationdetails')
   useEffect(()=>{
    const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
  console.log(empId, 'from localStorage')
      const fetchData = async ()=>{
        try{
          const empdetails = await axios.get(`/employee/${id}`,{

            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // console.log("data",employees)
          setempdata(empdetails.data.equipment
            )
            
            console.log(empdetails.data.equipment, 'empdetails from equipment')
        }
        catch(error){
          console.log('error',error);
        }
      }
      fetchData()
    },[])
    // const details = useSelector((state) => state?.Equipment);
    // const organizationDetails = details?.organization
    // const workerDetails = details?.worker

    return (
        <div className='w-full flex overflow-x-auto'>

            {organizationDetails && organizationDetails.map((data, index) => (
                <div key={index} className='flex flex-col justify-between  border border-gray-300 p-4 ml-5' style={{ width: '900px' }} >
                    <span className='flex gap-5 mb-4 items-center justify-between'>
                        <span className='flex items-center gap-3'>
                            <MdKeyboard className='bg-[#BAE7FF] w-8 h-8 p-2 rounded-full' />
                            <p>{data.Device}</p>
                        </span>
                        {(data.owner === true) && (
                            <span className='flex text-gray-400 items-center gap-2'>Status :<p className="font-medium text-sm text-black">{data.Date}</p></span>
                        )}
                    </span>

                    <div className='flex justify-between'>
                        <span className="mb-4">
                            <h2 className="text-gray-400">Model</h2>
                            <p className="font-medium text-sm">{data.Manufacturer}</p>
                        </span>
                        <span>
                            <h2 className="text-gray-400">Serial Number</h2>
                            <p className="font-medium text-sm">{data.SerialNumber}</p>
                        </span>
                        {(data.owner === true) ? (<span>
                            <h2 className="text-gray-400">Own by</h2>
                            <p className="font-medium text-sm">Organisation</p>
                        </span>) : (<span>
                            <h2 className="text-gray-400">Own by</h2>
                            <p className="font-medium text-sm">Worker</p>
                        </span>)}

                    </div>

                    <span>
                        <h2 className="text-gray-400">Note</h2>
                        <p className="font-medium text-sm">{data.Notes}</p>
                    </span>


                </div>
            ))}



        </div>

    )
}

export default EquipmentCard