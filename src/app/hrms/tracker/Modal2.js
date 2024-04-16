"use client";
import React, { useState } from "react";
import { Button, Modal, Radio, Input, DatePicker } from "antd";
import { notification ,message} from "antd";
import axios from "@/api/axios";

import getAccessTokenFromCookie from "@/utils/getAccessToken";

const Modal2 = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [showInput, setShowInput] = useState(false);
  const [selectedRadioValue, setSelectedRadioValue] = useState(null); // Initially no selection
  const [showDatePicker, setShowDatePicker] = useState(false);

  const accessToken = getAccessTokenFromCookie();

  const openNotification = () => {
    message.open({
     type:'success', content: "Invitation has been sent Successfully",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    if (selectedRadioValue === 1) {
      handleConfirmAndContinue();
    }
    // Handle continue button logic based on selectedRadioValue and date (if applicable)
    console.log("Selected option:", selectedRadioValue);
    if (selectedRadioValue === 2) {
      // Get the selected date from the date picker (assuming you have a reference to it)
      // const selectedDate = // ... access date picker value
      //   console.log("Selected date:", selectedDate);
      setIsModalOpen(false);
    }
  };

  const SendEmail = async () => {
    // const empId = localStorage.getItem("empId");
    try {
      const response = await axios.get(`/invite/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(JSON.stringify(response.data));
      // setempdata(empdetails.data.personal_information);
      if (response.status === 200) {
        // localStorage.setItem("empId", "");
        // Set empId to an empty string
        openNotification();

        // router.push("/hrms");
      }
      setIsModalOpen(false);
    } catch (error) {
      if (error.response.data.message == "user already exists.") {
        message.open({
         type:'info', content: "Employee has already been invited",
        });
      } else {
        message.open({
        type:'error',  content: "There is some issue in sending Invite",
        });
      }
      setIsModalOpen(false);
      console.log(error);
    }
  };

  const handleConfirmAndContinue = () => {
    // Call the SendEmail function when the button is clicked
    SendEmail();
  };

  // const handleContinue = () => {
  //   setIsModalOpen(false);
  // };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (e) => {
    setSelectedRadioValue(e.target.value);
    // setSelectedOption(e.target.value);
    if (e.target.value === 1) {
      setShowDatePicker(false);
    } else {
      setShowDatePicker(true);
    }
  };
  // const handleRadioChange = (e) => {
  //   setShowDatePicker(e.target.value === 2); // Show date picker only for "Send later" option
  // };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-12 rounded-none mt-6"
      >
        Manage invite
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
        maskClosable={true}
        onClick={handleModalClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ textAlign: "left", padding: "20px" }}
          className="h-96 w-96"
        >
          <div>
            <h2 className="text-2xl font-semibold justify-center text-center">
              Send invite
            </h2>
          </div>
          {/* <div><p className='font-semibold mt-4 text-base justify-center text-center'>Select Method</p></div> */}
          <p className="mt-6">
            Your employee has not signed up to deel yet. You can resend them the
            invitation email.
          </p>
          <div className="mt-6">
            <Radio.Group
              value={selectedRadioValue}
              onChange={handleRadioChange}
            >
              <div className="bg-slate-50 h-14 rounded-lg">
                <Radio
                  value={1}
                  className="font-semibold mt-3 ml-2"
                  // onChange={handleRadioChange}
                >
                  {" "}
                  <p>Send Now</p>
                </Radio>
                <p className="text-xs ml-8">
                  Employee will receive an invitation email now.
                </p>
                {/* {showDatePicker && (
                  <DatePicker
                    className="mt-2 ml-6"
                    onChange={(date) => console.log(date)}
                  />
                )} */}
              </div>
              <div className="bg-slate-50 h-14 mt-2 rounded-lg">
                <Radio
                  value={2}
                  className="font-semibold mt-3 ml-2"
                  // onChange={handleRadioChange}
                >
                  <p>Send later</p>
                </Radio>
                <p className="text-xs ml-8">
                  Schedule invites for a specific day and time.
                </p>
              </div>
            </Radio.Group>
          </div>
          <div className="w-full">
            {showDatePicker && (
              <DatePicker
                style={{ width: "280px" }}
                width={1}
                className="mt-2 ml-6"
                onChange={(date) => console.log(JSON.stringify(date.$d))}
              />
            )}
          </div>
          <div style={{ textAlign: "center" }} className="mt-6">
            <Button
              type="primary"
              className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center rounded-none w-60"
              onClick={handleContinue}
            >
              Resend Invitation
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modal2;

// import React, { useState } from "react";
// import { Button, Modal, Radio, DatePicker } from "antd";

// const Modal2 = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRadioValue, setSelectedRadioValue] = useState(null); // Initially no selection
//   const [showDatePicker, setShowDatePicker] = useState(false); // Initially hide date picker

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleContinue = () => {
//     // Handle continue button logic based on selectedRadioValue and date (if applicable)
//     console.log("Selected option:", selectedRadioValue);
//     if (selectedRadioValue === 2) {
//       // Get the selected date from the date picker (assuming you have a reference to it)
//       const selectedDate = // ... access date picker value
//         console.log("Selected date:", selectedDate);
//     }
//     setIsModalOpen(false);
//   };

//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedRadioValue(null); // Reset selection on close
//     setShowDatePicker(false); // Reset date picker on close
//   };

//   const handleRadioChange = (e) => {
//     setSelectedRadioValue(e.target.value);
//     setShowDatePicker(e.target.value === 2); // Show date picker only for "Send later" option
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         onClick={showModal}
//         className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-12 rounded-none mt-6"
//       >
//         Manage invite
//       </Button>
//       <Modal
//         open={isModalOpen}
//         onCancel={handleModalClose}
//         footer={null}
//         closable={false}
//         maskClosable={true}
//         onClick={handleModalClick}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{ textAlign: "left", padding: "20px" }}
//           className="h-96 w-96"
//         >
//           <div>
//             <h2 className="text-2xl font-semibold justify-center text-center">
//               Send invite
//             </h2>
//           </div>
//           <p className="mt-6">
//             Your employee has not signed up to deel yet. You can resend them the
//             invitation email.
//           </p>
//           <div className="mt-6">
//             <Radio.Group
//               value={selectedRadioValue}
//               onChange={handleRadioChange}
//             >
//               <Radio value={1} className="font-semibold mt-3 ml-2">
//                 <p>Send Now</p>
//               </Radio>
//               <Radio value={2} className="font-semibold mt-3 ml-2">
//                 <p>Send later</p>
//               </Radio>
//             </Radio.Group>
//             {showDatePicker && (
//               <DatePicker.Picker
//                 className="mt-2 ml-6"
//                 onChange={(date) => console.log(date)}
//               />
//             )}
//           </div>
//           <div style={{ textAlign: "center" }} className="mt-6">
//             <Button
//               type="primary"
//               className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center rounded-none w-60"
//               onClick={handleContinue}
//               disabled={!selectedRadioValue} // Disable button if no radio option is selected
//             >
//               Resend Invitation
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Modal2;
