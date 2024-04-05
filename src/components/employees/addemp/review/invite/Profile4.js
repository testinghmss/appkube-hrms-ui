'use client'
import React, {useEffect ,useState } from 'react';
import { Radio, Space, DatePicker, Form, TreeSelect, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { SendEmail } from './Profile3';
import { useRouter } from 'next/navigation';
import getAccessTokenFromCookie from '@/utils/getAccessToken';
import axios from '@/api/axios';

const Profile4 = () => {
    const [value, setValue] = useState(1);

    
  
    const router = useRouter()
    const accessToken = getAccessTokenFromCookie()


    
 const [empdata, setempdata] = useState({})
 console.log(empdata,'this is empdata')
  

  useEffect(()=>{
    const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
  console.log(empId, 'from localStorage')
      const fetchData = async ()=>{
        try{
          const empdetails = await axios.get(`/employee/${empId}`,{
  
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
         
          // console.log("data",employees)
          setempdata(empdetails.data)
  
        }
        catch(error){
          console.log('error',error);
        }
      }
      fetchData()
    },[])
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div className=''>
                <p className='text-center font-medium text-2xl '>Create profile and invite</p>
                <p className='text-center'>when do you want {empdata.first_name}to receive an invitation to join </p>

                <Radio.Group onChange={onChange} className=''>
                    <Space direction="vertical" className='mt-8'>
                        <div className=' border-1 w-[470px] p-2 rounded-md '>
                            <Radio value={1}>Immediately</Radio>
                        </div>
                        <div className=' border-1 w-[470px] p-2 rounded-md '>
                            <Radio value={2}>Not Now</Radio>
                        </div>
                        <div className=' border-1 w-[470px] p-2 rounded-md '>
                            <Radio value={3}>Schedule invite</Radio>
                        </div>
                    </Space>
                </Radio.Group>
                <div className='bg-green-200 my-3 w-[100%] rounded-sm'>
                    <p className='pl-4 p-2'>
                        {EmpData.first_name} 
                        {/* start date is feb 28th, 2024 ! */}
                        </p>
                </div>
                <Form.Item>
                    <DatePicker placeholder='24/01/2024 ' className=' p-2 w-[100%]' />
                </Form.Item>
                <Form.Item>
                    <TreeSelect />
                </Form.Item>
                <Space className='w-[100%] ' wrap>
                    <TimePicker defaultValue={dayjs('12:08', 'HH:mm')} size="large" className='w-[475px]' />
                </Space>
            </div>
        </>
    )
}

export default Profile4;
