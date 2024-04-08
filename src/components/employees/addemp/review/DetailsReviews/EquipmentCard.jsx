// 'use client'
// import React, { useEffect, useState } from 'react';
// import { MdKeyboard } from 'react-icons/md';
// import axios from '@/api/axios';
// import getAccessTokenFromCookie from '@/utils/getAccessToken';

// const EquipmentCard = () => {
//     const accessToken = getAccessTokenFromCookie();
//     const [organizationDetails, setOrganizationDetails] = useState([]);
// console.log(organizationDetails,'organizationdetails')
//     const empId = typeof window !== 'undefined' ? localStorage.getItem('empId') : null;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const empDetails = await axios.get(`/employee/${empId}`, {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });

//                 setOrganizationDetails(empDetails.data.equipment);
//             } catch (error) {
//                 console.log('error', error);
//             }
//         };

//         fetchData();
//     }, [empId, accessToken]);

//     return (
//         <div className="w-full flex overflow-x-auto">
//             {organizationDetails.length > 0 ? (
//                 organizationDetails.map((data, index) => (
//                     <div key={index} className="flex flex-col justify-between border border-gray-300 p-4 ml-5" style={{ width: '900px' }}>
//                         <span className="flex gap-5 mb-4 items-center justify-between">
//                             <span className="flex items-center gap-3">
//                                 <MdKeyboard className="bg-[#BAE7FF] w-8 h-8 p-2 rounded-full" />
//                                 <p>{data.device_type_name}</p>
//                             </span>
//                             {data.owner === true && (
//                                 <span className="flex text-gray-400 items-center gap-2">Status :<p className="font-medium text-sm text-black">{data.supply_date}</p></span>
//                             )}
//                         </span>

//                         <div className="flex justify-between">
//                             <span className="mb-4">
//                                 <h2 className="text-gray-400">Model</h2>
//                                 <p className="font-medium text-sm">{data.manufacturer}</p>
//                             </span>
//                             <span>
//                                 <h2 className="text-gray-400">Serial Number</h2>
//                                 <p className="font-medium text-sm">{data.serial_number}</p>
//                             </span>
//                             {data.owner === true ? (
//                                 <span>
//                                     <h2 className="text-gray-400">Own by</h2>
//                                     <p className="font-medium text-sm">Organisation</p>
//                                 </span>
//                             ) : (
//                                 <span>
//                                     <h2 className="text-gray-400">Own by</h2>
//                                     <p className="font-medium text-sm">Worker</p>
//                                 </span>
//                             )}
//                         </div>

//                         <span>
//                             <h2 className="text-gray-400">Note</h2>
//                             <p className="font-medium text-sm">{data.note}</p>
//                         </span>
//                     </div>
//                 ))
//             ) : (
//                 <p>No equipment details found.</p>
//             )}
//         </div>
//     );
// };

// export default EquipmentCard;

'use client'
import React, { useEffect, useState } from 'react';
import { MdKeyboard } from 'react-icons/md';
import axios from '@/api/axios';
import getAccessTokenFromCookie from '@/utils/getAccessToken';

const EquipmentCard = () => {
    const accessToken = getAccessTokenFromCookie();
    const [organizationDetails, setOrganizationDetails] = useState([]);

    const empId = typeof window !== 'undefined' ? localStorage.getItem('empId') : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empDetails = await axios.get(`/employee/${empId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                  console.log(empDetails, 'from equipment')
                setOrganizationDetails(empDetails.data.equipment);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, [empId, accessToken]);

    return (
        <div className="w-full flex overflow-x-auto">
            {(organizationDetails && organizationDetails.length > 0) ? (
                organizationDetails.map((data, index) => (
                    <div key={index} className="flex flex-col justify-between border border-gray-300 p-4 ml-5" style={{ width: '900px' }}>
                        <span className="flex gap-5 mb-4 items-center justify-between">
                            <span className="flex items-center gap-3">
                                <MdKeyboard className="bg-[#BAE7FF] w-8 h-8 p-2 rounded-full" />
                                <p>{data.device_type_name}</p>
                            </span>
                            {data.owner === true && (
                                <span className="flex text-gray-400 items-center gap-2">Status :<p className="font-medium text-sm text-black">{data.supply_date}</p></span>
                            )}
                        </span>

                        <div className="flex justify-between">
                            <span className="mb-4">
                                <h2 className="text-gray-400">Model</h2>
                                <p className="font-medium text-sm">{data.manufacturer}</p>
                            </span>
                            <span>
                                <h2 className="text-gray-400">Serial Number</h2>
                                <p className="font-medium text-sm">{data.serial_number}</p>
                            </span>
                            {data.owner === true ? (
                                <span>
                                    <h2 className="text-gray-400">Own by</h2>
                                    <p className="font-medium text-sm">Organisation</p>
                                </span>
                            ) : (
                                <span>
                                    <h2 className="text-gray-400">Own by</h2>
                                    <p className="font-medium text-sm">Worker</p>
                                </span>
                            )}
                        </div>

                        <span>
                            <h2 className="text-gray-400">Note</h2>
                            <p className="font-medium text-sm">{data.note}</p>
                        </span>
                    </div>
                ))
            ) : (
                <p>No equipment details found.</p>
            )}
        </div>
    );
};

export default EquipmentCard;

