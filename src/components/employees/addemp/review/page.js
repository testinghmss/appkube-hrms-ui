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
  import { useSelector } from "react-redux";
  import axios from "@/api/axios"
  import { useRouter } from "next/navigation";
  const Page = ({ tab, setTab }) => {
    const router = useRouter()
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
    // useEffect(()=>{
    //   console.log('in useeffect')
    //   const fetchData = async ()=>{
    //         // getting employee id from local storage 

    //     // setEmpId(id)
    //     try{
    //       console.log('employee id from local storage',id)
    //       // fetching data by employee id in case of data not found in redux
    //       const response = await axios.get(`/employee/${id}`,{
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`
    //         }
    //       });
    //       console.log("response of employee id for equipments",response.data.equipment)
    //       // storing equipment data intto usestate
    //       setFetchData({...fetchedData,equipment:response.data.equipment});
    //       // console.log("data",employees)

    //       // fetching data by employee id in case of data not found in redux
    //       const response2 = await axios.get(`/employee/${id}`,{
    //         headers: {
    //           'Authorization': `Bearer ${accessToken}`
    //         }
    //       });
    //       console.log("response of employee id for documents",response2.data.documents)
    //       // storing equipment data intto usestate

    //       setFetchData({...fetchedData,documents:response2.data.documents});
    //     }
    //     catch(error){
    //       console.log('error fetching employee data',error);
    //     }
    //   }
    //   fetchData()
    // },[accessToken,fetchedData])


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
    }, [id, accessToken,router]);
    

    // getting data from redux using useselector
    // const reduxEquipmentData = useSelector(state => state.Details?.equipDetails)
    // console.log('redux data for equipments ',reduxEquipmentData)
    // console.log('fetched data by id for equipments ',fetchedData.equipment)
    // // setData(reduxData)
    // // condittionally trendering the data eitther from redux or from fetched  data by id 
    // const equipmenData = reduxEquipmentData.length > 0 ? reduxEquipmentData : fetchedData.equipment;
    // console.log("data ofequipments details",equipmenData)
  
    //   // getting data from redux using useselector

    // const reduxDocumentsData = useSelector(state => state.Details?.documentDetails)
    // console.log('redux data for equipments ',reduxDocumentsData)
    // console.log('fetched data by id for equipments ',fetchedData.equipment)
    // // setData(reduxData)

    //   // condittionally trendering the data eitther from redux or from fetched  data by id 

    // const documentsData = reduxDocumentsData.length > 0 ? reduxDocumentsData : fetchedData.equipment;
    // console.log("data ofequipments details",documentsData)





    return (
      <div className="p-10 bg-gray-200">
        <div className="w-full mb-5 p-5 bg-white">
          <div className="flex justify-between w-full mb-4">
            <p className="font-medium text-xl">Personal Information</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center border px-5 py-2" onClick={() => { setTab(1) }}>
                <RiEditFill />
                <p>Edit</p>
              </button>
              {/* <button className="bg-[#1890FF] text-white px-4 py-2">
                <p>Finished</p>
              </button> */}
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
