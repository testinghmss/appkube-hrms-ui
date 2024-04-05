"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Profile1 from "./Profile1";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile4 from "./Profile4";
import Profile5 from "./Profile5";

const Invite = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const [step, setStep] = useState(1);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("");
    setConfirmLoading(true);
    if (step === 4) {
      setStep(5); // Move to profile5 when the "Continue" button is clicked in profile4
    }
  };

  // Custom handler for closing the modal
  const handleClose = () => {
    setVisible(false);
    setStep(1); // Reset step to 1 when modal is canceled
  };

  return (
    <div className="">
      <button
        
        onClick={showModal}
        className="bg-[#1890FF] rounded-none text-white border hover:text-[#1890FF] hover:bg-white hover:border-[#1890FF] p-2"
      >
        Finished
      </button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleClose}
        okText={step === 4 ? "Continue" : ""}
        okButtonProps={{
          style: {
            backgroundColor: "#1890ff",
            display: step === 4 ? "inline-block" : "none",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {/* Conditionally render profile based on step */}
        {/* {step === 1 && <Profile1 step={step} setStep={setStep} />}
        {step === 2 && <Profile2 step={step} setStep={setStep} />}
        {step === 3 && <Profile3 step={step} setStep={setStep} />}
        {step === 4 && <Profile4 step={step} setStep={setStep} />}
        {step === 5 && <Profile5 step={step} setStep={setStep} />} */}

        {step === 1 && <Profile1 key={step} step={step} setStep={setStep} />}
        {step === 2 && <Profile2 key={step} step={step} setStep={setStep} />}
        {step === 3 && <Profile3 key={step} step={step} setStep={setStep} />}
        {step === 4 && <Profile1 key={step} step={step} setStep={setStep} />}
        {step === 5 && <Profile5 key={step} step={step} setStep={setStep} />}

        {/* {rednerComponent()} */}
      </Modal>
    </div>
  );
};

export default Invite;
