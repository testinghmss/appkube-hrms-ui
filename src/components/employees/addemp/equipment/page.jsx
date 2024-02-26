"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Checkbox, DatePicker, Input, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData } from "@/redux/slices/Equipment";
import { addFormData } from "@/redux/slices/Equipment";
import EquipmentForm from './EquipmentForm'

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const handleFormSubmit = () => {
  localStorage.setItem("EquipmentData", JSON.stringify(EquipmentData));
};
const FormDisabledDemo1 = () => {
  const [EquipmentData, setEquipmentData] = useState({
    providedBy: "",
    deviceType: "",
    manufacturer: "",
    serialNumber: "",
    notes: "",
    supplyDate: null,
  });
};

const Equipments = ({ tab, setTab }) => {
  
  const [collapsed, setCollapsed] = useState(false);
  // const { token: { colorBgContainer } } = theme.useToken();


 



  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [provideBy, setProvideBy] = useState('org');
  const [selectedDate, setSelectedDate] = useState(null);

  
  const [formState, setFormState] = useState({
    devicetype: '',
    manufacturerName: '',
    serialnumber: '',
    notes: '',
    supplyDate: '',
  });

  const handleProvideByChange = (e) => {
    //setProvideBy(e.target.value);
   // setSelectedDate(null);
  };

  const isSupplyDateVisible = () => provideBy === 'org';
 // const handleDateChange = (date) => {
   // setSelectedDate(date);
 // };

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    }
  };

 
  
  const router = useRouter();

  
 

  const handleAddItemButtonClick = (data) => {
    dispatch(addFormData(data));  
    setFormState({
      devicetype: '',
      manufacturerName: '',
      serialnumber: '',
      notes: '',
      supplyDate: '',
    });
    //localStorage.setItem('formData', JSON.stringify(data)); 
  };

  return (
    <div>
      <div
            style={{
              padding: 24,
              minHeight: 100,
              background: 'white',
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            <div className=' flex gap-5'>
              <div><img src='https://cdn-icons-png.flaticon.com/512/68/68792.png' className='h-8 w-10'></img></div>
              <div className='w-full'>
                <h1 className='text-xl'><b>Equipment</b></h1>
                <p className='text-gray-400 mt-1.5'>Provide your own equipment and keep track of it for seamless work experiences</p>
              </div>
              <div><Button type="primary" className='bg-blue-600 rounded-none mt-3'>Add Equipment</Button></div>
            </div>
          </div>

      <div
            style={{
              padding: 24,
              minHeight: 300,
              background: 'white',
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            <div style={{
              padding: 24,
              minHeight: 120,
            }}>
              <EquipmentForm onAddItems={handleAddItemButtonClick} tab={tab} setTab={setTab} />
              
            </div>
          </div>
      

          <div
            style={{
              padding: 24,
              minHeight: 120,
              background: 'white',
              marginTop: 30,
              marginLeft: 10,
            }}
          >
            <div className=' flex gap-5'>
              <div className='bg-cyan-400 h-12 w-16 rounded-full'>
                <img
                  src='https://www.iconpacks.net/icons/1/free-keyboard-icon-1405-thumb.png'
                  className='rounded-xl h-6 w-6 ml-2.5 mt-3'
                  alt="Equipment Icon"
                ></img>
              </div>
              <div className='w-full'>
                <h1 className='text-xl'><b></b></h1>
                <h4 className='text-gray-400 mt-1.5 flex' id='output1'>Manufacturer Name: <p className='text-black ml-1'></p></h4>
                <h4 className='text-gray-400 mt-1.5 flex' id='output2'>Serial number: <p className='text-black ml-1'></p></h4>
                <h4 className='text-gray-400 mt-1.5 flex' id='output3'>Supply Date: <p className='text-black ml-1'></p></h4>
                <h4 className='text-gray-400 mt-1.5 flex' id='output4'>Notes: <p className='text-black ml-1'></p></h4>
              </div>
              <div className='flex gap-4'>
                <Button type="editbtn" className='text-black rounded-none mt-3 flex h-8 w-24 hover:text-blue-600 hover:border-blue-600 border-gray-300 font-semibold text-base'>
                  <img src='https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png' className='h-4 w-4 mt-1 ml-2' alt="Edit Icon" />
                 <p className='ml-1'> Edit</p>
                </Button>

                <Button type="dltbtn" className='text-white rounded-none mt-3 bg-red-500 hover:text- hover:border-red-600 border-gray-300 font-semibold text- flex h-8 w-24 justify-center'>
                  <img src='https://cdn-icons-png.flaticon.com/512/3687/3687412.png' className='h-6 w-6 bg-transparent hover:text-cyan-600' alt="Delete Icon" />
                 <p className='ml-1'> Delete</p> 
                </Button>
              </div>
            </div>
          </div>

    </div>
  );
};

export default Equipments;
