'use client'
import DocumentCard from "./DetailsReviews/DocumentCard";
import EquipmentCard from "./DetailsReviews/EquipmentCard";
import EquipmentDetails from "./DetailsReviews/EquipmentDetails";
import PersonalInfo from "./DetailsReviews/PersonalInfo";
import ProfessionalInfo from "./DetailsReviews/ProfessionalInfo";


  import React, { useEffect, useState } from "react";
  import { RiEditFill } from "react-icons/ri";
  import Image from "next/image";
  import ProfImg from "@/../public/assets/empDetails/Avatar1.svg";
  import Invite from "./invite/Invite";
  import getAccessTokenFromCookie from "@/utils/getAccessToken";
  import { useDispatch,useSelector } from "react-redux";
  import axios from "@/api/axios"
  import { useRouter } from "next/navigation";
  import { setEditPersonal } from "@/redux/slices/Details";
  const Page = ({ tab, setTab ,editPersonal,setEditPersonal}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    //  created usestate for storing redux data into same variable
    const [fetchedData , setFetchData] = useState({
      equipment:[],
      documents:[],
    })
    const [data, setdata] = useState()
    const accessToken = getAccessTokenFromCookie();
    // const empId =  localStorage.getItem('empId')
    // console.log('emmpid from localstorage',empId)
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
        setdata(response.data.personal_information)
  
        } 
        catch (error) {
          console.log('error fetching employee data', error);
        }
      };
      fetchData();
    }, [id, accessToken,router]);
    

    return (
      <div className="p-10 bg-gray-200">
        <div className="w-full mb-5 p-5 bg-white">
          <div className="flex justify-between w-full mb-4">
            <p className="font-medium text-xl">Personal Information</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center border px-5 py-2" onClick={  ()  => { setEditPersonal(true) ,setTab(1)}}>
                <RiEditFill />
                <p>Edit</p>
              </button>
              <Invite />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Image src={data?.image} className="w-[100px] " alt="profile" width={100} height={100} />
            <PersonalInfo />
          </div>
        </div>

        <div className="mb-5 p-5 bg-white">
          <div className="flex justify-between w-full mb-4 ">
            <p className="font-medium text-xl">Professional Information</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center border px-5 py-2" onClick={() => { setTab(2) }}>
                <RiEditFill />
                <p>Edit</p>
              </button>
            </div>
          </div>
          <ProfessionalInfo />
        </div>

        <div className="mb-5 p-5 bg-white">
          <div className="flex justify-between w-full mb-4">
            <p className="font-medium text-xl">Equipment Details</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center border px-5 py-2" onClick={() => { setTab(3) }}>
                <RiEditFill />
                <p>Edit</p>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <EquipmentCard />

          </div>
        </div>

        <div className="mb-5 p-5 bg-white">
          <div className="flex justify-between w-full mb-4">
            <p className="font-medium text-xl">Documents</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center border px-5 py-2" onClick={() => { setTab(4) }}>
                <RiEditFill />
                <p>Edit</p>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <DocumentCard />
            {/* <DocumentCard /> */}
          </div>
        </div>
      </div>
    );
  };

  export default Page;
