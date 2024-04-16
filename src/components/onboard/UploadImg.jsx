import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Image from 'next/image';
import axios from '@/api/axios'; 
import {useDispatch} from "react-redux"
import getAccessTokenFromCookie from '@/utils/getAccessToken';


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const App = () => {

  const accessToken = getAccessTokenFromCookie()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const dispatch = useDispatch()


  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get base64 representation of the image
      getBase64(info.file.originFileObj, async (url) => {
        setLoading(false);
        setImageUrl(url);
        // Upload the image to the server
        try {
          const response = await axios.post(
            '/docUpload',
            { fileName: info.file.name, data: url },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data);
          // alert('Image uploaded successfully!');
          // dispatch(setPersonalData(response.data.link))
          // console.log(response.data.link,"this is for image url");
           
          // dispatch(uploadData(response.data.link ));
          // console.log(dispatch(setonboardingImg({image:response.data.link} )));

        } catch (error) {
          console.error(error);
          // alert('Error uploading image. Please try again.');
        }
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 6,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className='scale-[60%]'>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader w-10"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="avatar"
            width={100}
            height={100}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default App;
