import React from 'react'
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";


const loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffffa1] z-10">
      <Spin
        tip="Loading"
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 70,
            }}
            spin
          />
        }
      />
    </div>
  );
}

export default loading