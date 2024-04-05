// "use client";
// import React, { useState, useEffect } from "react";
// import { Radio, Space, Tabs } from "antd";
// import TopNav from "./TopNav";
// import { IoMdPerson } from "react-icons/io";
// import { BiReceipt } from "react-icons/bi";
// import Image from "next/image";
// import ProjectIcon from "@/../../public/assets/empDetails/Projects.svg";
// import AllProjects from "./AllProjects";

// const LeftNav = ({empData}) => {

//   useEffect(() => {
//     // Accessing location object inside useEffect
//     if (typeof window !== 'undefined') {
//       // Access location object here
//       console.log(window.location.href);
//     }
//   }, []);
//   const [tabPosition, setTabPosition] = useState("left");
//   const [activeTab, setActiveTab] = useState("1");

//   const tabContents = {
//     1: <TopNav empData={empData}/>,
//     2: <AllProjects empData={empData}/>,
//   };

//   const changeActiveTab = (key) => {
//     setActiveTab(key);
//   };

//   return (
//     <div className="w-30">
//       <Tabs
//         tabPosition={tabPosition}
//         activeKey={activeTab}
//         onTabClick={(key) => changeActiveTab(key)}
//         style={{ marginLeft: 10 }}
//         tabBarStyle={{ width: "150px" }}
//       >
//         <Tabs.items
//           tab={
//             <span className="flex items-center gap-3">
//               <IoMdPerson className="text-lg" />
//               Profile{" "}
//             </span>
//           }
//           key="1"
//         >
//           {tabContents["1"]}
//         </Tabs.items>
//         <Tabs.items
//           tab={
//             <span className="flex items-center gap-3">
//               <BiReceipt className="text-lg" />
//               Projects
//             </span>
//           }
//           key="2"
//         >
//           {tabContents["2"]}
//         </Tabs.items>
//       </Tabs>
//     </div>
//   );
// };

// export default LeftNav;

'use client'
// LeftNav.jsx

import React, { useState, useEffect } from "react";
import { Radio, Space, Tabs } from "antd";
import TopNav from "./TopNav";
import { IoMdPerson } from "react-icons/io";
import { BiReceipt } from "react-icons/bi";
import Image from "next/image";
import ProjectIcon from "@/../../public/assets/empDetails/Projects.svg";
import AllProjects from "./AllProjects";

const LeftNav = ({ empData }) => {
  useEffect(() => {
    // Accessing location object inside useEffect
    if (typeof window !== 'undefined') {
      // Access location object here
      console.log(window.location.href);
    }
  }, []);
  
  const [tabPosition, setTabPosition] = useState("left");
  const [activeTab, setActiveTab] = useState("1");

  const tabContents = {
    1: <TopNav empData={empData} />,
    2: <AllProjects empData={empData} />,
  };

  const changeActiveTab = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="w-30">
      <Tabs
        tabPosition={tabPosition}
        activeKey={activeTab}
        onTabClick={(key) => changeActiveTab(key)}
        style={{ marginLeft: 10 }}
        tabBarStyle={{ width: "150px" }}
      >
        <Tabs.TabPane
          tab={
            <span className="flex items-center gap-3">
              <IoMdPerson className="text-lg" />
              Profile{" "}
            </span>
          }
          key="1"
        >
          {tabContents["1"]}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="flex items-center gap-3">
              <BiReceipt className="text-lg" />
              Projects
            </span>
          }
          key="2"
        >
          {tabContents["2"]}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default LeftNav;
