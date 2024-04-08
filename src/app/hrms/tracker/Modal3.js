'use client'
import React from 'react';
import { setParticularEmpid } from '@/redux/slices/Details';
import { useDispatch } from 'react-redux';
import { Button } from 'antd'; // Import Button with a capital "B"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
const Modal3 = ({id}) => {
  const dispatch = useDispatch();
  const router = useRouter()
  return (
    <div>
        {/* <Button className='bg-red-200'><Link href={/hrms/employees/employeesOverView?id=${id}}> View profile</Link> </Button> */}
        <Button className='bg-red-200' onClick={()=>{
              dispatch(setParticularEmpid(id));
              localStorage.setItem('trackerId', id)
              router.push("/hrms/employees/employeesOverView");


        }}> View profile </Button>
    </div>
  );
};

export default Modal3;