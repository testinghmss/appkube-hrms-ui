
'use client';
import React, { useState } from 'react';
import { Button, Modal, Radio, Input } from 'antd';

const Modal1 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showInput, setShowInput] = useState(false);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleContinue = () => {
      setIsModalOpen(false);
    };
  
    const handleModalClick = (e) => {
      e.stopPropagation();
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleRadioChange = (e) => {
      setSelectedOption(e.target.value);
      if (e.target.value === 1) {
        setShowInput(true);
      } else {
        setShowInput(false);
      }
    };
  
    return (
      <>
        <Button type="primary" onClick={showModal} className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center ml-12 rounded-none mt-6">
          Resend Invite
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
          closable={false}
          maskClosable={true}
          onClick={handleModalClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
          }}
        >
          <div style={{ textAlign: 'left', padding: '20px'}} className='h-96 w-96'>
            
            <div><h2 className='text-2xl font-semibold justify-center text-center'>Resend Invite</h2></div>
            {/* <div><p className='font-semibold mt-4 text-base justify-center text-center'>Select Method</p></div> */}
  <p className='mt-6'>Your employee has not signed up to deel yet. You can resend them the invitation email.</p>
            <div className='mt-6'>
              <div className='bg-slate-50 h-14 rounded-lg'>
               <p></p>
              </div>
              <div className='bg-slate-50 h-14 mt-2 rounded-lg'>
                <p className='text-xs ml-8'>Employee email address</p>
              </div>
             
            </div>
            <div style={{ textAlign: 'center' }} className='mt-6'>
              <Button type="primary" className="bg-[#1890FF] hover:text-[#1890FF] border hover:bg-white hover:border-[#1890FF] text-white flex p-4 gap-3 justify-center items-center  rounded-none w-60" onClick={handleContinue}>
              Resend invitation
            </Button></div>
          </div>
        </Modal>
      </>
    );
  };
  
export default Modal1