"use client";
import LeftNav from "@/components/employeesOverview/LeftNav";
import TopEmpDt from "@/components/employeesOverview/TopEmpDtl";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import Loading from "@/app/loading";
import { useSelector } from 'react-redux'


// import { loadBindings } from 'next/dist/build/swc'
const Page = () => {
  // const [searchParams, setSearchParams] = useState(null);
  // const searchParams = useSearchParams();
  // const userId =  searchParams?.get('id')
  // console.log('id from  params',userId)

  const id = useSelector((state) => state.Details.ParticularempId)
  const [fetchedData, setFetchData] = useState({});
  const accessToken = getAccessTokenFromCookie();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setSearchParams(useSearchParams());
    setIsClient(true);
  }, []);
  useEffect(() => {
    console.log("in useffect");
    if (isClient) {
      // const searchParams = useSearchParams();
      // const userId =  searchParams.get('id')
      const userId = "kasjdak";
      console.log("id from  params", userId);
      const fetchData = async () => {
        // setEmpId(id)
        try {
          // const id = await localStorage.getItem('empId')
          setLoading(true);

          console.log("employee id from local storage", userId);
          const response = await axios.get(`/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("response of employee data for overview", response.data);
          setFetchData(response.data);
          // console.log("data",employees)
        } catch (error) {
          console.log("error fetching employee data", error);
        } finally {
          setLoading(false); // Set loading state to false after response or error is received
        }
      };
      fetchData();
    }
  }, [setFetchData, accessToken, isClient]);

  // const reduxData = useSelector(state => state.professionalDetails)
  // console.log('redux data for equipments ',reduxData)
  console.log("fetched data by id for overview ", fetchedData);
  // setData(reduxData)
  // const data = reduxData.length > 0 ? reduxData : fetchedData;
  // console.log("data of employee details",data)
  return (
    // <React.Suspense fallback={<div>Loading...</div>}>
    <>
      {loading && <Loading />}

      <div>
        <TopEmpDt  empData={fetchedData}/>
        <LeftNav  empData={fetchedData}/>
        {/* <TopEmpDt /> */}
        {/* <LeftNav /> */}
      </div>
    </>
  );
};

export default Page;
