"use client";
import React, { useState } from 'react';
import { Radio, Input, DatePicker, Button } from 'antd';
// import { addFormData } from '@/redux/slices/Equipment';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectFormData } from '@/redux/slices/Equipment';


const { TextArea } = Input;

const Form = ({ onAddItems, tab,setTab }) => {
  // const dispatch = useDispatch();
  // const formData = useSelector(selectFormData);
  const [provideBy, setProvideBy] = useState('org');
  const [selectedDate, setSelectedDate] = useState(null);

  
  // const [formState, setFormState] = useState({
  //   devicetype: '',
  //   manufacturerName: '',
  //   serialnumber: '',
  //   notes: '',
  //   supplyDate: '',
  // });

  const handleProvideByChange = (e) => {
    setProvideBy(e.target.value);
   // setSelectedDate(null);
  };

  const isSupplyDateVisible = () => provideBy === 'org';
 // const handleDateChange = (date) => {
   // setSelectedDate(date);
 // };

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      // setFormState((prevFormState) => ({
      //   ...prevFormState,
      //   [name]: value,
      // }));
      console.log('data',name,value)
    }
  };

 
  const handleAddItemButtonClick = () => {
    // dispatch(addFormData(formState));
    // setFormState({
    //   devicetype: '',
    //   manufacturerName: '',
    //   serialnumber: '',
    //   notes: '',
    //   supplyDate: '',
    // });
  };
  

 return (
    
    <div className="flex flex-col items-center justify-center min-h-96">
      <form className="w-8/12 mt-0" onClick={(values)=>{
            console.log('done',values)
          }}>
        <div className="mb-4 flex items-center">
          <label className="text-sm font-medium w-32 min-w-44">Device Provide by:</label>
          <div className="flex ml-2 mb-2">
            <Radio.Group onChange={handleProvideByChange} value={provideBy}>
              <Radio value="org" className='font-medium'>Own by organization</Radio>
              <Radio value="worker" className='font-medium'>Own by worker</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-sm font-medium w-32 min-w-44 mb-2" htmlFor="deviceType">
            Device Type:
          </label>
          <Input
            style={{ width: '100%' }}
            className="border py-2 px-3 hover:border-sky-600 ml-2 mb-2 h-8"
            name="devicetype"
            type="text"
            placeholder="Laptop"
            // value={formState.devicetype}
            onChange={handleInputChange}
          />
          
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-sm font-medium w-32 min-w-44 mb-2" htmlFor="manufacturerName" id='manufacturername'>
            Manufacturer Name:
          </label>
          <Input
        
            style={{ width: '100%' }}
            className="border  hover:border-sky-600 py-2 px-3 mb-3 h-8 ml-2"
            name="manufacturerName"
            type="text"
            placeholder="Hp Laptop"
            // value={formState.manufacturerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-sm font-medium w-32 min-w-44 mb-2" htmlFor="serialnumber" id='serialnumber'>
            Serial number:
          </label>
          <Input
           
            style={{ width: '100%' }}
            className="border hover:border-sky-600 py-2 px-3 mb-2 h-8 ml-2"
            name="serialnumber"
            type="text"
            placeholder="First Name"
            // value={formState.serialnumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6 flex items-center">
          <label className="text-sm font-medium w-32 min-w-44" htmlFor="notes">
            Notes:
          </label>
          <TextArea
            style={{ width: '100%' }}
            className="border  hover:border-sky-600 py-2 px-3 mb-2 ml-2"
            name="notes"
            placeholder="Design"
            rows={4}
            // value={formState.notes}
            onChange={handleInputChange}
          />
        </div>
        {isSupplyDateVisible() && (
          <div className="mb-6 flex items-center">
            <label className="text-sm font-medium w-32 min-w-44 mb-2" htmlFor="supplyDate">
              Supply Date:
            </label>
            <DatePicker
              name="supplyDate"
              className="border flex-1 hover:border-sky-600 ml-2 mb-2"
              placeholder="Select date"
              // value={formState.supplyDate}
              onChange={handleInputChange}
            />
          </div>
         )}
        <div className='flex justify-center gap-4 mt-10 ml-32'>
        <Button type="dashed" onClick={handleAddItemButtonClick} className='border-dashed border border-cyan-600 text-cyan-600 h-8 w-36 text-base'>
            Add Items
          </Button>
          <Button type="primary"  className='rounded-none bg-blue-600 h-8 w-36 text-base' onClick={()=>{setTab(tab+1)}}>
            Next
          </Button>
        </div>
        </form>
    </div>
  );
};

export default Form;