// "use client";
// // "use server"

// import Image from "next/image";
// import React from "react";
// // import Upload from "./upload";
// import axios from "@/api/axios";
// import { FaRegFileAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { Progress, Table, notification } from "antd";
// // import { AiFillDelete } from "react-icons/ai";
// // import Delete from './Table';
// // import FileTable from './FileTable';
// // <<<<<<< asif
// // import FileTable from "./FileTable";

// // const Documents = ({ tab, setTab }) => {
// //   return (
// //     <div className="w-full h-full p-10 flex flex-col bg-white ">
// // =======
// // import axios from "axios";
// import FileTable from "./FileTable";
// import { useState,useEffect } from "react";
// import getAccessTokenFromCookie from "@/utils/getAccessToken";
// // import { Upload } from "antd";
// import { Upload as AntUpload } from "antd"
// import { InboxOutlined } from "@ant-design/icons";
// const { Dragger } = AntUpload;
// import { setDocumentDetails } from "@/redux/slices/Details";
// import { useDispatch } from "react-redux";

// const Documents = ({ tab, setTab }) => {
//   // getting employee id from local storage
//   // const empId = localStorage.getItem("empId");
//   // updated usestate as required for backend
//   const [req, setReq] = useState({ fileName: "", data: "" });
//   const [docs , setDocs] = useState({name:'' ,url : ''})
//   const dispatch = useDispatch();
//   const [fileuploaded, setfileuploaded] = useState(false);
//   const accessToken = getAccessTokenFromCookie();
//   const [Attachments, setAttachments] = useState([]);
//   const [isClient, setIsClient] = useState(false);

 

//   // Wrap the client-only code inside this conditional
  
//   const handleFileChange = (info) => {
//     const file = info.file.originFileObj; // Access the selected file object
//     console.log("THis is file", file);
//     console.log("This is info file", info.file,'and',info.file.originFileObj);
//     console.log(info.file, info.fileList, "these are lists of files ");
//     console.log(info.fileList, "THis is inof multiple ");

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64 = reader.result;
//         setReq({ fileName: file.name, data: base64 });
//         setfileuploaded(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   console.log("req data", req);

//   console.log("attachmemnts data", Attachments);
//   const uploadFile = async () => {
//     // const data = {amar:req.url}
//     try {
//       console.log('uploadinf file',req)
//       const response = await axios.post("/docUpload",
//         // data,
//        req,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log("uploaded image response", response.data);
//       // storing response link as url in usestate
//       // setReq({ ...req, url: response.data.link });
//       setDocs({name:req.fileName,url:response.data.link})
//       // alert("Image uploaded successfully!");
//       imageTrueNotification()
//       console.log('docs to push',docs)
//       // setAttachments(response.data.link);
//       // setAttachments([...Attachments, response.data.link]);
//       // pushing object req with name and url of document
//       // if(docs.name && docs.url){
//       //   Attachments.push(docs);
//       // }
//       console.log("attachments", Attachments);
//     } catch (error) {
//       console.error("error uploading image", error);
//       // console.log(error);
//       // alert("Error uploading image. Please try again.");
//       imageFalseNotification()
//     }
//   };

//   if (fileuploaded) {
//     // useEffect(()=>{
//     uploadFile()
//     setfileuploaded(false);
//   }
//   console.log(Attachments);


//   useEffect(() => {
//     // Check if both name and url are truthy
//     setIsClient(true);
//     if (docs.name && docs.url) {
//       // Push the docs object into Attachments
//       setAttachments(prevAttachments => [...prevAttachments, docs]);
//     }
//   }, [docs,isClient]);
  
//   const MyUploads = () => {
//     return (
//       // <Dragger {...props}>
//       //   <p className="ant-upload-drag-icon ">
//       //     <InboxOutlined />
//       //   </p>
//       //   <p className="ant-upload-text">Click or drag file to this area to upload</p>
//       //   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
//       // </Dragger>
//       <>
//         <Dragger
//           multiple
//           onChange={(e) => {
//             handleFileChange(e);
//           }}
//         >
//           <p className="ant-upload-drag-icon">
//             <InboxOutlined />
//           </p>
//           <p className="ant-upload-text">
//             Click or drag file to this area to upload
//           </p>
//           <p className="ant-upload-hint">
//             Support for a single or bulk upload. Strictly prohibited from
//             uploading company data or other banned files.
//           </p>
//         </Dragger>
//         <div>
//           <h2>Uploaded Files </h2>
//           <div className="flex flex-row gap-4 p-4">
//             {Attachments.map((e, index) => {
//               return (
//                 <Image
//                   key={index}
//                   src={e.url}
//                   alt="Uploaded images"
//                   height={50}
//                   width={50}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </>
//     );
//   };
//   // data format {
//   //   "emp_id": "4e585c37-66ab-47a4-9985-2161e125a61c",
//   //   "documents": [
//   //     {
//   //       "name": "adhar",
//   //       "url": "https://example.com/image.jpg"
//   //     },
//   //     {
//   //       "name": "newdoc",
//   //       "url": "https://example.com/image.jpg"
//   //     }
//   //   ]
//   // }
//   const HandleDocuments = async () => {
//     // creating variable data for hitting api as per format with empid and documents
//     if (isClient) {
//       // Access localStorage only in the client-side context
//       // const empId = localStorage.getItem("empId");
//       const empId = localStorage.getItem("empId");
//       console.log("id from localstorage", empId);
//       // Your remaining client-side code here...
    
//     const data = {
//       emp_id: empId,
//       documents: Attachments,
//     };
//     try {
//       console.log("data to put", data);
//       const response = await axios.put("/employee/document", data, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log("response of documemnst", response);
//       if (response.status === 200) {
//         // storing the response in redux
//         dispatch(setDocumentDetails(response.data));
//         // changing the tab
//         trueNotification()
//         setTab(tab + 1);
//       }
//     } catch (error) {
//       console.log("error uploading document", error);
//       falseNotification()
//     }


//   }
//   };
//   const falseNotification = () => {
//     notification.open(
//       {message: 'please review the details and fill all fields with correct details',}
//     );
//   };
// const trueNotification = () => {
//     notification.open(
//       {message: 'documents information stored,redirected to Review screen',}
//     );
//   };
//   const imageTrueNotification = () => {
//     notification.open(
//       {message: 'Image uploaded successfully!',}
//     );
//   };
// const imageFalseNotification = () => {
//     notification.open(
//       {message: 'Error uploading image. Please try again.',}
//     );
//   };
//   return (
//     <div className="w-full h-full p-10 flex flex-col ">
//       <div>
//         <MyUploads />
//       </div>

//       {/* <div className="mt-10 border border-gray-400 p-4 rounded-xl">
//         <div className="flex justify-between">
//           <div className="flex gap-2">
//             <div className="bg-[#E6F7FF] w-10 h-10 flex items-center justify-center rounded-full">
//               <FaRegFileAlt />
//             </div>
//             <spam>
//               <p>Educational Certificates 01</p>
//               <p>1.2 MB</p>
//             </spam>
//           </div>
//           <RxCross2 />
//         </div>

//         <Progress percent={20} showInfo={true} className="ml-12 w-[96%] " />
//       </div> */}

//       <p className="mt-6 font-semibold text-lg">Attach Files</p>
//       <FileTable />

//       <button
//         className="w-[30%]  bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF] m-auto h-9 "
//         onClick={HandleDocuments}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Documents;



'use client'

import React from "react";
// import Upload from "./upload";
import axios from "@/api/axios";
import { FaRegFileAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Button, Progress, Table, notification } from "antd";
import FileTable from "./FileTable";
import { useState, useEffect } from "react";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import { Upload } from "antd";
import { Upload as AntUpload } from "antd"
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = AntUpload;
import { deletedocumentFullDetails, setDocumentDetails, setdocumentFullDetails } from "@/redux/slices/Details";
import { useDispatch, useSelector } from "react-redux";

const Documents = ({ tab, setTab }) => {
  // getting employee id from local storage
  // const empId = localStorage.getItem("empId");
  // updated usestate as required for backend
  const [req, setReq] = useState({ fileName: "", data: "" });
  const [docs, setDocs] = useState({ name: '', data: '' })
  const dispatch = useDispatch();
  const [fileuploaded, setfileuploaded] = useState(false);
  const accessToken = getAccessTokenFromCookie();
  const [Attachments, setAttachments] = useState([]);
  const [isClient, setIsClient] = useState(false);

console.log(Attachments, 'attachments')

  // Wrap the client-only code inside this conditional

  const handleFileChange = (info) => {
    const file = info.file.originFileObj; // Access the selected file object
    console.log("THis is file", file);
    console.log("This is info file", info.file, 'and', info.file.originFileObj);
    console.log(info.file, info.fileList, "these are lists of files ");
    console.log(info.fileList, "THis is inof multiple ");

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setReq({ fileName: file.name, data: base64 });
        setfileuploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("req data", req);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based, and padding with '0' if needed
  const day = String(currentDate.getDate()).padStart(2, '0'); // Padding with '0' if needed

  const dateString = `${year}-${month}-${day}`;

  console.log("attachmemnts data", Attachments);
  const uploadFile = async () => {
    // const data = {amar:req.url}
    try {
      console.log('uploadinf file', req)
      const response = await axios.post("/docUpload",
        // data,
        req,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("uploaded image response", response.data);
 
      setDocs({ name: req.fileName, data: req.data })
      // alert("Image uploaded successfully!");
    dispatch(setdocumentFullDetails(Attachments));

      imageTrueNotification()
      console.log('docs to push', docs)


      console.log("attachments", Attachments);

    } catch (error) {
      console.error("error uploading image", error);
      imageFalseNotification()
    }
  };
  console.log(Attachments);
  // if (Attachments) {
  // }

  if (fileuploaded) {
    // useEffect(()=>{
    uploadFile()
    setfileuploaded(false);
  }


  useEffect(() => {
    // Check if both name and url are truthy
    setIsClient(true);
    if (docs.name && docs.data) {
      // Push the docs object into Attachments
      setAttachments(prevAttachments => [...prevAttachments, docs]);
    }
  }, [docs, isClient]);

  const MyUploads = () => {
    return (
      <>
        <Dragger
          multiple
          onChange={(e) => {
            handleFileChange(e);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </>
    );
  };
  
  const HandleDocuments = async () => {
    // creating variable data for hitting api as per format with empid and documents
    if (isClient) {
      // Access localStorage only in the client-side context
      // const empId = localStorage.getItem("empId");
      const empId = localStorage.getItem("empId");
      console.log("id from localstorage", empId);
      // Your remaining client-side code here...

      const data = {
        emp_id: empId,
        documents: Attachments,
      };
      try {
        console.log("data to put", data);
        const response = await axios.put("/employee/document", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response of documemnst", response);
        if (response.status===200) {
          // storing the response in redux
          dispatch(setDocumentDetails(response.data));
          // changing the tab
          trueNotification()
          setTab(tab + 1);
        }
      } catch (error) {
        console.log("error uploading document", error);
        falseNotification()
      }


    }
  };
  const falseNotification = () => {
    notification.open(
      { message: 'please review the details and fill all fields with correct details', }
    );
  };
  const trueNotification = () => {
    notification.open(
      { message: 'documents information stored,redirected to Review screen', }
    );
  };
  const imageTrueNotification = () => {
    notification.open(
      { message: 'Image uploaded successfully!', }
    );
  };
  const imageFalseNotification = () => {
    notification.open(
      { message: 'Error uploading image. Please try again.', }
    );
  };

  return (
    <div className="w-full h-full p-10 flex flex-col ">
      <div>
        <MyUploads />
      </div>
      <p className="mt-6 font-semibold text-lg">Attach Files</p>
      <FileTable data= {Attachments} />
      <button
        className="w-[30%]  bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF] m-auto h-9 mt-10 "
        onClick={HandleDocuments}
      >
        Next
      </button>
    </div>
  );
};

export default Documents;