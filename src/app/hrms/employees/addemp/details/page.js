// 





'use client'
import React, { useState, useEffect } from "react";
import { Breadcrumb, Tabs } from "antd";
import Documents from "@/components/employees/addemp/documents/Documents";
import Equipment from "@/components/employees/addemp/equipment/page";
import Personal from "@/components/employees/addemp/persdetails/page";
import Professional from "@/components/employees/addemp/profdetails/page";
import Review from "@/components/employees/addemp/review/page";
import axios from '@/api/axios'
import getAccessTokenFromCookie from "@/utils/getAccessToken";

const Page = () => {
  const accessToken = getAccessTokenFromCookie()
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState({
    personal: null,
    professional: null,
    equipment: null,
    documents: null,
    review: null,
  }); // State to store fetched data for each tab

  const items = [
    {
      key: "1",
      label: "Personal Information",
      children: <Personal tab={activeTab}  setTab={setActiveTab} data={data.personal} setData={(newData) => setData({ ...data, personal: newData })} />,
    },
    {
      key: "2",
      label: "Professional Information",
      children: <Professional tab={activeTab} setTab={setActiveTab} data={data.professional} setData={(newData) => setData({ ...data, professional: newData })} />,
    },
    {
      key: "3",
      label: "Equipment Details",
      children: <Equipment tab={activeTab} setTab={setActiveTab} data={data.equipment} setData={(newData) => setData({ ...data, equipment: newData })} />,
    },
    {
      key: "4",
      label: "Document",
      children: <Documents tab={activeTab} setTab={setActiveTab} data={data.documents} setData={(newData) => setData({ ...data, documents: newData })} />,
    },
    {
      key: "5",
      label: "Review",
      children: <Review tab={activeTab} setTab={setActiveTab} data={data.review} setData={(newData) => setData({ ...data, review: newData })} />,
    },
  ];

  const onChange = (key) => {
    setActiveTab(parseInt(key));
  };

  useEffect(() => {

  const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
    
    const fetchData = async (tab) => {
      

      const response = await axios.get(`/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData((prevData) => ({ ...prevData, [tab]: response.data }));
      console.log(response, 'from details page')
    };
    

    if (activeTab) {
      fetchData(activeTab); // Fetch data for the initially active tab
    }
  }, [activeTab]); // Re-run useEffect when activeTab changes

  return (
    <>
      <div className="bg-white px-2 py-3 my-2 mr-2 flex flex-col gap-3">
        <Breadcrumb
          className="mt-3 pl-3"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Employees",
            },
            {
              title: "Add Employee",
            },
          ]}
        />
        <h1 className="pl-3 pt-3 text-2xl font-semibold">Add New Employee</h1>
      </div>

      <Tabs
        defaultActiveKey="1"
        activeKey={`${activeTab}`}
        onTabClick={console.log('cant move forward')}
        className="pl-3 pt-2"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default Page;
