"use client";
import React from "react";
import { Tabs } from "antd";
import PersonalDetails from "./personaldetails/Personaldetail";
// import Orgdetail from "./organization/organizationdetails/orgdetail";
import Organizationdetails from "./organization/Organizationdetails";
const Preference = () => {
  return (
    <Tabs defaultActiveKey="1" className="px-2">
      <Tabs.TabPane tab="Personal Informaton" key="1">
        <PersonalDetails />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Organizational Information" key="2">
        <Organizationdetails />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Security " key="3" disabled></Tabs.TabPane>
      <Tabs.TabPane tab="Notifications " key="4" disabled></Tabs.TabPane>
    </Tabs>
  );
};

export default Preference;
