import React from 'react';
import { Button } from 'antd'; // Import Button with a capital "B"
import Link from 'next/link'
const Modal3 = ({id}) => {
  return (
    <div>
        <Button className='bg-red-200'><Link href={`/hrms/employees/employeesOverView?id=${id}`}> View profile</Link> </Button>
    </div>
  );
};

export default Modal3;
