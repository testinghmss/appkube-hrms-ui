// "use client";

// import { Inter } from "next/font/google";

// import "../globals.css";
// import {
//   DashboardOutlined,
//   FormOutlined,
//   TableOutlined,
//   UserOutlined,
//   HighlightOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu } from "antd";
// import React, { useState } from "react";
// import Link from "next/link";
// import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import axios from "@/api/axios";
// import { useRouter } from "next/navigation";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store/store";
// import { Input } from "antd";
// const { Search } = Input;
// import Image from "next/image";
// import Account from "../../../public/assets/homeicons/Setting.svg";
// import Vector2 from "../../../public/assets/homeicons/Vector2.svg";
// import Bell from "../../../public/assets/homeicons/Bell.svg";

// export default function RootLayout({ children }) {
//   const { Header, Content, Footer, Sider } = Layout;
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();
//   const onSearch = (value) => console.log(value);
//   const accessToken = getAccessTokenFromCookie();

//   const fetchData = async () => {
//     try {
//       const values = await axios.get("/employee?page=1", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log("response", values.data.employees);
//       return values.data.employees;
//     } catch (error) {
//       console.log("error", error);
//       return null;
//     }
//   };

//   const items = [
//     {
//       key: "1",
//       icon: <DashboardOutlined />,
//       children: <Link href={"/hrms"}>Dashboard</Link>,
//       label: "Dashboard",
//     },
//     {
//       key: "2",
//       icon: <FormOutlined />,
//       children: <Link href={"/hrms/projects"}>Project</Link>,
//       label: "Project",
//     },
//     {
//       key: "3",
//       icon: <TableOutlined />,
//       children: <Link href={"/hrms/employees"}>Employees</Link>,
//       label: "Employees",
//     },
//     {
//       key: "4",
//       icon: <UserOutlined />,
//       children: <Link href={"/hrms/preference"}>Preference</Link>,
//       label: "Preference",
//     },
//     {
//       key: "5",
//       icon: <HighlightOutlined />,
//       children: <Link href={"/hrms/tracker"}>Tracker</Link>,
//       label: "Tracker",
//     },
//   ];

//   if (typeof window === "undefined") {
//     // Handle server-side rendering or non-browser environments
//     return null;
//   }

//   if (accessToken && fetchData()) {
//     return (
//       <html lang="en">
//         <body>
//           <Provider store={store}>
//             <Header
//               style={{
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 1,
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 alignContent: "center",
//               }}
//             >
//               <div>
//                 <h2 className="text-white uppercase">Synectiks</h2>
//               </div>
//               <div className="flex">
//                 <div className="flex justify-center items-center bg-white border rounded-md">
//                   <Search
//                     placeholder="input search text"
//                     onSearch={onSearch}
//                     style={{
//                       width: 200,
//                       borderRadius: 9,
//                     }}
//                   />
//                 </div>
//                 <div className="flex w-full gap-4 justify-evenly px-4">
//                   <Image src={Vector2} alt="vector" />
//                   <Image className="text-white" src={Bell} alt="bell" />
//                   <Image src={Account} alt="account" />
//                 </div>
//               </div>
//             </Header>
//             <Layout style={{ minHeight: "100vh" }}>
//               <Sider
//                 collapsible
//                 collapsed={collapsed}
//                 onCollapse={(value) => setCollapsed(value)}
//                 style={{
//                   overflow: "auto",
//                   height: "100vh",
//                   position: "fixed",
//                   marginTop: "10vh",
//                   left: 0,
//                   top: 0,
//                   bottom: 0,
//                 }}
//               >
//                 <div />
//                 <Menu
//                   theme="light"
//                   defaultSelectedKeys={["1"]}
//                   mode="inline"
//                   style={{ height: "100%" }}
//                   items={items}
//                 ></Menu>
//               </Sider>
//               <Layout className="site-layout flex flex-col">
//                 <Content
//                   style={{
//                     paddingLeft: 10,
//                   }}
//                 >
//                   <div
//                     className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}
//                   >
//                     {children}
//                     <Footer style={{ marginLeft: 200 }}></Footer>
//                   </div>
//                 </Content>
//               </Layout>
//             </Layout>
//           </Provider>
//         </body>
//       </html>
//     );
//   } else {
//     router.push("/");
//     return null;
//   }
// }








// "use client";

// import { Layout, Menu, Dropdown, Input } from "antd";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import getAccessTokenFromCookie, { removeAccessToken } from "@/utils/getAccessToken";
// import axios from "@/api/axios";
// import { useRouter } from "next/navigation";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store/store";
// import Image from "next/image";
// import Account from "../../../public/assets/homeicons/Setting.svg";
// import Vector2 from "../../../public/assets/homeicons/Vector2.svg";
// import Bell from "../../../public/assets/homeicons/Bell.svg";
// import { useSelector } from "react-redux";

// import "../globals.css";
// import {
//   DashboardOutlined,
//   FormOutlined,
//   TableOutlined,
//   UserOutlined,
//   HighlightOutlined,
// } from "@ant-design/icons";
// const { Header, Content, Footer, Sider } = Layout;
// const { Search } = Input;

// export default function RootLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();
//   const accessToken = getAccessTokenFromCookie();
//   const onBoarded = useSelector((state) => state.Onboardingpersdetails);

//   const handleLogout = () => {
//     removeAccessToken();
//     router.push("/");
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="logout" onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   const items = [
//     { label: "Dashboard", href: "/hrms", icon: <DashboardOutlined /> },
//     { label: "Project", href: "/hrms/projects", icon: <FormOutlined /> },
//     { label: "Employees", href: "/hrms/employees", icon: <TableOutlined /> },
//     { label: "Preference", href: "/hrms/preference", icon: <UserOutlined /> },
//     { label: "Tracker", href: "/hrms/tracker", icon: <HighlightOutlined /> },
//   ];

//   const fetchData = async () => {
//     try {
//       const values = await axios.get("/employee?page=1", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log("response", values.data.employees);
//       return values.data.employees;
//     } catch (error) {
//       console.log("error", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       if (!accessToken || !fetchData()) {
//         router.push("/");
//       } else if (!onBoarded.OnboardingData) {
//         router.push("/onboarding");
//       }
//     };

//     checkAuthentication();
//   }, []);

//   return (
//     <Provider store={store}>
//       <Layout style={{ minHeight: "100vh" }}>
//         <Header
//           style={{
//             position: "sticky",
//             top: 0,
//             zIndex: 1,
//             width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <h2 className="text-white uppercase">Synectiks</h2>
//           </div>
//           <div className="flex">
//             <div className="flex justify-center items-center bg-white border rounded-md">
//               <Search
//                 placeholder="input search text"
//                 onSearch={(value) => console.log(value)}
//                 style={{ width: 200, borderRadius: 9 }}
//               />
//             </div>
//             <div className="flex w-full gap-4 justify-evenly px-4">
//               <Image src={Vector2} alt="vector" />
//               <Image className="text-white" src={Bell} alt="bell" />
//               <Dropdown overlay={menu} placement="bottomRight">
//                 <button>
//                   <Image src={Account} alt="account" />
//                 </button>
//               </Dropdown>
//             </div>
//           </div>
//         </Header>
//         <Layout>
//           <Sider
//             collapsible
//             collapsed={collapsed}
//             onCollapse={(value) => setCollapsed(value)}
//             style={{
//               overflow: "auto",
//               height: "100vh",
//               position: "fixed",
//               marginTop: "10vh",
//               left: 0,
//               top: 0,
//               bottom: 0,
//             }}
//           >
//             <Menu
//               theme="light"
//               defaultSelectedKeys={["1"]}
//               mode="inline"
//               style={{ height: "100%" }}
//             >
//               {items.map((item, index) => (
//                 <Menu.Item key={index + 1} icon={item.icon}>
//                   <Link href={item.href}>{item.label}</Link>
//                 </Menu.Item>
//               ))}
//             </Menu>
//           </Sider>
//           <Layout>
//             <Content style={{ padding: "0 50px", marginTop: 64 }}>
//               <div className="site-layout-content">{children}</div>
//             </Content>
//             <Footer style={{ textAlign: "center" }}>Footer</Footer>
//           </Layout>
//         </Layout>
//       </Layout>
//     </Provider>
//   );
// }



// "use client";


// import "../globals.css";

// import {
//   DashboardOutlined,
//   FormOutlined,
//   TableOutlined,
//   UserOutlined,
//   HighlightOutlined,
// } from "@ant-design/icons";
// import { Layout, Modal, Dropdown, Menu, Input } from "antd";
// const { Item } = Menu;
// import React, { useState } from "react";
// import Link from "next/link";
// import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import axios from "@/api/axios";
// import { useRouter } from "next/navigation";
// import { removeAccessToken } from "@/utils/getAccessToken";

// import { Provider } from "react-redux";
// import { store } from "@/redux/store/store";

// const { Search } = Input;

// import Image from "next/image";
// // import Vector from "../../../public/assets/homeicons/Vector.svg";
// // import Vector1 from "../../../public/assets/homeicons/Vector1.svg";
// // import Wrapper from "../../../public/assets/homeicons/wrapper.svg";
// // import Wrapper1 from "../../../public/assets/homeicons/wrapper1.svg";
// // import Wrapper2 from "../../../public/assets/homeicons/wrapper2.svg";
// // import Icon from "../../../public/assets/homeicons/icon.svg";
// import Account from "../../../public/assets/homeicons/Setting.svg";
// import Vector2 from "../../../public/assets/homeicons/Vector2.svg";
// import Bell from "../../../public/assets/homeicons/Bell.svg";

// import { useSelector } from "react-redux";


// const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }


// export default function RootLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();
//   const onSearch = (value) => console.log(value);

//   const handleLogout = () => {
//     // Clear cookie or local storage here
//     removeAccessToken();
//     // Navigate to login page
//     router.push("/");
//   };

//   const menu = (
//     <Menu>
//       <Item key="logout" onClick={handleLogout}>
//         Logout
//       </Item>
//     </Menu>
//   );

//   const onBoarded = useSelector((state) => state.Onboardingpersdetails);

//   const accessToken = getAccessTokenFromCookie();

//   const fetchData = async () => {
//     try {
//       const values = await axios.get("/employee?page=1", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log("response", values.data.employees);
//       return values.data.employees;
//       // console.log("data",employees)
//     } catch (error) {
//       console.log("error", error);
//       return null;
//     }
//   };

//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }

//   const items = [
//     getItem(<Link href={"/hrms"}>Dashboard</Link>, "1", <DashboardOutlined />),
//     getItem(<Link href={"/projects"}>Project</Link>, "2", <FormOutlined />),
//     getItem(
//       <Link href={"/hrms/employees"}>Employees</Link>,
//       "3",
//       <TableOutlined />
//     ),
//     getItem(
//       <Link href={"/hrms/preference"}>Preference</Link>,
//       "4",
//       <UserOutlined />
//     ),
//     getItem(
//       <Link href={"/hrms/tracker"}>Tracker</Link>,
//       "5",
//       <HighlightOutlined />
//     ),
//   ];

//   const siderStyle = {
//     textAlign: "left",
//     color: "#fff",
//     backgroundColor: "#fff",
//   };
//   if (accessToken && fetchData()) {
//     if (onBoarded.OnboardingData) {
//       return (
//         <html lang="en">
//           <body>
//             <Provider store={store}>
//               <Header
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 1,
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   alignContent: "center",
//                 }}
//               >
             
//                 <div>
//                   <h2 className="text-white uppercase">Synectiks</h2>
//                 </div>

//                 <div className="flex">
//                   <div className="flex justify-center items-center bg-white border rounded-md">
//                     <Search
//                       placeholder="input search text"
//                       onSearch={onSearch}
//                       style={{
//                         width: 200,
//                         borderRadius: 9,
//                       }}
//                     />
//                   </div>
//                   <div className="flex w-full gap-4 justify-evenly px-4">
//                     <Image src={Vector2} alt="vector" />
//                     <Image className="text-white" src={Bell} alt="bell" />
//                     <Dropdown
//                       menu={menu}
//                       placement="bottomRight"
//                       arrow={{ pointAtCenter: true }}
//                       trigger={["click"]}
//                     >
//                       <button>
//                         <Image src={Account} alt="account" />
//                       </button>
//                     </Dropdown>
//                   </div>
//                 </div>
//               </Header>

            
//               <Layout style={{ minHeight: "100vh" }}>
//                 <Sider
//                   // style={siderStyle}
//                   collapsible
//                   collapsed={collapsed}
//                   onCollapse={(value) => setCollapsed(value)}
//                   style={{
//                     overflow: "auto",
//                     height: "100vh",
//                     position: "fixed",
//                     marginTop: "10vh",
//                     left: 0,
//                     top: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <div />
//                   <Menu
//                     theme="light"
//                     defaultSelectedKeys={["1"]}
//                     mode="inline"
//                     style={{ height: "100%" }}
//                     items={items}
//                   >
                 
//                   </Menu>
//                 </Sider>
//                 <Layout className="site-layout flex flex-col">
//                   <Content
//                     style={{
//                       // margin: '24px 16px 0',

//                       // overflow: 'initial',

//                       // display:"flex",
//                       // flexDirection:"column"
//                       paddingLeft: 10,
//                     }}
//                   >
//                     <div
//                       className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}
//                       // {collapsed?style={{marginLeft: 80}}:style={{marginLeft: 200}}}
//                       style={
//                         {
//                           // padding: 24,
//                           // textAlign: 'center',
//                           // position:"absolute",
//                           // left:"13%",
//                           // top:"2%",
//                           // width:"85%"
//                           // marginLeft: 200,
//                           // padding:'10px',
//                         }
//                       }
//                     >
//                       {children}

//                       <Footer
//                         style={{
//                           // textAlign: 'center',
//                           marginLeft: 200,
//                         }}
//                       ></Footer>
//                     </div>
//                   </Content>
//                 </Layout>
//               </Layout>
//             </Provider>
//           </body>
//         </html>
//       );
//     } else {
//       router.push("/onboarding");
//       return null;
//     }
//   } else {
//     router.push("/");
//     return null;
//   }
// }

// // /hrms






"use client";

import "../globals.css";

import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  UserOutlined,
  HighlightOutlined,
  DownOutlined
} from "@ant-design/icons";
import { Layout, Modal, Dropdown, Menu, Input, Button } from "antd";
const { Item } = Menu;
import React, { useState } from "react";
import Link from "next/link";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { removeAccessToken } from "@/utils/getAccessToken";

import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

const { Search } = Input;

import Image from "next/image";
import Account from "../../../public/assets/homeicons/Setting.svg";
import Vector2 from "../../../public/assets/homeicons/Vector2.svg";
import Bell from "../../../public/assets/homeicons/Bell.svg";

import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const onSearch = (value) => console.log(value);

  const handleLogout = () => {
    removeAccessToken();
    router.push("/");
  };

  // const menu = (
  //   <Menu>
  //     <Item key="logout" onClick={handleLogout}>
  //       Logout
  //     </Item>
  //   </Menu>
  // );

  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Handle logout action here
      removeAccessToken();
    router.push("/");
    }
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );


  const onBoarded = useSelector((state) => state.Onboardingpersdetails);

  const accessToken = getAccessTokenFromCookie();

  const fetchData = async () => {
    try {
      const values = await axios.get("/employee?page=1", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response", values.data.employees);
      return values.data.employees;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link href={"/hrms"}>Dashboard</Link>, "1", <DashboardOutlined />),
    getItem(<Link href={"/projects"}>Project</Link>, "2", <FormOutlined />),
    getItem(
      <Link href={"/hrms/employees"}>Employees</Link>,
      "3",
      <TableOutlined />
    ),
    getItem(
      <Link href={"/hrms/preference"}>Preference</Link>,
      "4",
      <UserOutlined />
    ),
    getItem(
      <Link href={"/hrms/tracker"}>Tracker</Link>,
      "5",
      <HighlightOutlined />
    ),
  ];

  const siderStyle = {
    textAlign: "left",
    color: "#fff",
    backgroundColor: "#fff",
  };

  const isClient = typeof window !== "undefined";

  if (accessToken && fetchData()) {
    if (onBoarded.OnboardingData) {
      return (
        <html lang="en">
          <body>
            <Provider store={store}>
              <Header
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div>
                  <h2 className="text-white uppercase">Synectiks</h2>
                </div>

                <div className="flex">
                  <div className="flex justify-center items-center bg-white border rounded-md">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      style={{
                        width: 200,
                        borderRadius: 9,
                      }}
                    />
                  </div>
                  <div className="flex w-full gap-4 justify-evenly px-4">
                    <Image src={Vector2} alt="vector" />
                    <Image className="text-white" src={Bell} alt="bell" />
                    {/* <Dropdown
                      menu={menu}
                      placement="bottomRight"
                      arrow={{ pointAtCenter: true }}
                      onOpenChange={(visible) => {
                        if (visible) {
                          // Handle dropdown open
                        } else {
                          // Handle dropdown close
                        }
                      }}
                    > */}
                    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      placement="bottomRight"
    >
      <Button>
        Account <DownOutlined />
      </Button>
    </Dropdown>
                      {/* <button>
                        <Image src={Account} alt="account" />
                      </button>
                    </Dropdown> */}
                  </div>
                </div>
              </Header>

              <Layout style={{ minHeight: "100vh" }}>
                <Sider
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                  style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    marginTop: "10vh",
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <div />
                  <Menu
                    theme="light"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    style={{ height: "100%" }}
                    items={items}
                  />
                </Sider>
                <Layout className="site-layout flex flex-col">
                  <Content
                    style={{
                      paddingLeft: 10,
                    }}
                  >
                    <div
                      className={`${collapsed ? "ml-[80px]" : "ml-[200px]"}`}
                      style={{}}
                    >
                      {children}

                      <Footer
                        style={{
                          marginLeft: 200,
                        }}
                      ></Footer>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </Provider>
          </body>
        </html>
      );
    } else {
      if (isClient) {
        router.push("/onboarding");
      }
      return null;
    }
  } else {
    if (isClient) {
      router.push("/");
    }
    return null;
  }
}