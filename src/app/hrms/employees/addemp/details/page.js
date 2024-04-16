"use client";
import React, { useState } from "react";
import { Breadcrumb, Tabs } from "antd";
import Documents from "@/components/employees/addemp/documents/Documents";
import Equipment from "@/components/employees/addemp/equipment/page";
import Personal from "@/components/employees/addemp/persdetails/page";
import Professional from "@/components/employees/addemp/profdetails/page";
import Review from "@/components/employees/addemp/review/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [editPersonal,setEditPersonal] = useState(false)
  const items = [
    {
      key: "1",
      label: "Personal Information",
      children: <Personal tab={activeTab} setTab={setActiveTab} editPersonal={editPersonal} setEditPersonal={setEditPersonal}/>,
      // disabled: activeTab !== 1 && true,
    },
    {
      key: "2",
      label: "Professional Information",
      children: <Professional tab={activeTab} setTab={setActiveTab} />,
      // disabled: activeTab !== 2 && true,
    },
    {
      key: "3",
      label: "Equipment Details",
      
      children: <Equipment tab={activeTab} setTab={setActiveTab} />,
      // disabled: activeTab !== 3 && true,
    },
    {
      key: "4",
      label: "Document",
      children: <Documents tab={activeTab} setTab={setActiveTab} />,
      // disabled: activeTab !== 4 && true,
    },
    {
      key: "5",
      label: "Review",
      children: <Review tab={activeTab} setTab={setActiveTab} editPersonal={editPersonal} setEditPersonal={setEditPersonal}/>,
      // disabled: activeTab !== 5 && true,
    },
  ];
  const onChange = (key) => {
    console.log("onchange", key);
    setActiveTab(parseInt(key));
    console.log("onclickingnext", activeTab);
  };
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
        // activeKey="1"
        onTabClick={console.log('cant move forward')}
        className="pl-3 pt-2"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default Page;