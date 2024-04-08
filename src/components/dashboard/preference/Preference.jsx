"use client";
// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalDetail from "./personaldetails/Personaldetail";
import Organizationdetails from "./organization/Organizationdetails";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios";
import Loading from "@/app/loading";
import EditButton from "./personaldetails/EditButton";

const Preference = () => {
  const [isClient, setIsClient] = useState(false);
  const [fetchedData , setFetchData] = useState([])
  const accessToken = getAccessTokenFromCookie();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("in useEffect");
    if (isClient) {
      const hrId = localStorage.getItem("hrId");
      console.log("Hr id from local storage", hrId);
      const fetchData = async () => {
        try {
          setLoading(true);

          const response = await axios.get(`/employee/${hrId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("response of employee data for overview",response.data)
          setFetchData(response.data);
        } catch (error) {
          console.log("Error fetching employee data", error);
        } finally {
          setLoading(false); // Set loading state to false after response or error is received
        }
      }
      fetchData()
    }
  }, [accessToken, isClient]);

  console.log("Fetched HR data ", fetchedData.personal_information);

  return (
    <>
      {loading && <Loading />}

      <Tabs defaultActiveKey="1" className="px-2">
        <Tabs.TabPane tab="Personal Information" key="1">
          <EditButton fetchedData={fetchedData.personal_information} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Organizational Information" key="2">
          <Organizationdetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Security" key="3" disabled></Tabs.TabPane>
        <Tabs.TabPane tab="Notifications" key="4" disabled></Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Preference;
