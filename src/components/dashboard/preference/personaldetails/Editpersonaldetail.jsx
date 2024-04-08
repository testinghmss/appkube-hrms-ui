import React, { useState, useRef, useEffect } from "react";
import { Button, Radio, Input, Form, Select ,Option} from "antd";
// import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import { IoSaveSharp } from "react-icons/io5";
import PersonalDetail from "./Personaldetail";
import Image from "next/image";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios"
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70, backgroundColor: "gray" }} defaultValue="+91" options={[
        {
          value: '+91',
          label: '+91',
        },
        {
          value: '+87',
          label: '+87',
        },
        ]} />
      
  
  </Form.Item>
);
import Profile from "@/../../public/assets/onboarding/profile.svg";
// import { fetchData } from "@/components/employees/addemp/review/invite/Profile1";



const Editpersonaldetail = ({setFirstStep, firstStep,hrData}) => {
  const [save, setSave] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [fetchedData , setfetchedData] = useState()
  const accessToken = getAccessTokenFromCookie();
  const [formData, setFormData] = useState()
  const getAccessToken = getAccessTokenFromCookie()
  // const [hrData,sethrData] = useState()
  useEffect(() => {
    // Check if both name and url are truthy
    setIsClient(true);
    setfetchedData(hrData || {})
  },[fetchedData])
  
  console.log('hr data ain oaojs',hrData)

  useEffect(()=>{
    console.log('in useffect')
    if( isClient){
      // const searchParams = useSearchParams();
      // const userId =  searchParams.get('id')
      const hrId = localStorage.getItem('hrId'); 
      console.log('Hr id from  localstorage',hrId)
      const fetchData = async ()=>{
        // setEmpId(id)
        try{
          // const id = await localStorage.getItem('empId')
          // console.log('employee id from local storage',userId)
          const response = await axios.get(`/employee/${hrId}`,{
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log("response of employee data for overview",response.data.personal_information)
          setfetchedData(response.data.personal_information);
          // console.log("data",employees)
        }
        catch(error){
          console.log('error fetching employee data',error);
        }
      }
      fetchData()
    }
  },[accessToken,isClient])
  
  // console.log('fetched hr data',fetchedData)

     
// address_line_1
// : 
// "falaknuma"
// address_line_2
// : 
// "jahanuma"
// city
// : 
// "Hyderabad"
// country
// : 
// "India"
// dob
// : 
// "2024-04-03T00:00:00.000Z"
// email
// : 
// "abdullahahil153@gmail.com"
// emergency_number
// : 
// null
// emp_id
// : 
// null
// first_name
// : 
// "Md "
// gender
// : 
// "Male"
// highest_qualification
// : 
// null
// image
// : 
// ""
// landmark
// : 
// null
// last_name
// : 
// "Abdullah"
// number
// : 
// "9505934716"
// state
// : 
// "Telangana"
// work_email
// : 
// "abdullahahil7861@gmail.com"
// zipcode
// : 
// "500053"
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 100; // Specify the maximum width here
        const maxHeight = 100; // Specify the maximum height here
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  console.log('hr data in edit personal info',fetchedData,`step ${setFirstStep} and first ${firstStep}`)
  const formattedDOB = hrData?.dob ? new Date(hrData.dob).toISOString().split('T')[0] : '';
  //   
// address_line_1
// : 
// "falaknuma"
// address_line_2
// : 
// "jahanuma"
// city
// : 
// "Hyderabad"
// country
// : 
// "India"
// dob
// : 
// "2024-04-03T00:00:00.000Z"
// email
// : 
// "abdullahahil153@gmail.com"
// emergency_number
// : 
// null
// emp_id
// : 
// null
// first_name
// : 
// "Md "
// gender
// : 
// "Male"
// highest_qualification
// : 
// null
// image
// : 
// ""
// landmark
// : 
// null
// last_name
// : 
// "Abdullah"
// number
// : 
// "9505934716"
// state
// : 
// "Telangana"
// work_email
// : 
// "abdullahahil7861@gmail.com"
// zipcode
// : 
// "500053"
  
const handleDropDownChange = (name, value) => {
  setFormData({ ...formData, [name]: value });
  console.log(name, value, "change");
};
const dateHandle = (name, value) => {
  const dateValue = value ? value.format("YYYY-MM-DD") : "";
  setFormData({ ...formData, [name]: dateValue });
  console.log(name, dateValue, "change");
};

const handleInputChange = (e) => {
  console.log("form data", formData);
  const { name, value } = e.target;
  // setFormData({ ...formData, [name]: value });
  console.log(name, value, "change");
};
console.log("form data", formData);

const handleSave = async ()=>{
  // formatt {
  //   "first_name": "John",
  //   "last_name": "Doe",
  //   "email": "John@matrix.com",
  //   "work_email": "John_work_email@matrix.com",
  //   "gender": "Male",
  //   "dob": "1990-01-01",
  //   "number": "1234567890",
  //   "emergency_number": "9876543210",
  //   "highest_qualification": "Master's Degree",
  //   "address_line_1": "456 Updated St",
  //   "address_line_2": "Suite 202",
  //   "landmark": "Near the river",
  //   "country": "USA",
  //   "state": "California",
  //   "city": "Los Angeles",
  //   "zipcode": "90001",
  //   "image": "https://example.com/updated_image.jpg"
  // }
  const data = {
    first_name : formData.first_name,
    last_name : formData.last_name,
    dob : formData.dob,
    number : formData.number,
    gender : formData.gender,
    image : formData.image,
    ...formData,
  }
  try {
    console.log('hr personal data to put',data)
    const response = await axios.put(`/employee/${hrData.id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("success", response.data);

    if (response.status === 200) {
      console.log('sssuccesss')
    }
  } catch (error) {
    console.log("error", error);
  }

  setFirstStep(firstStep - 1);

}
  return (
    <>
        <div className="h-full w-full flex flex-col gap-5 p-2">
          <div className="flex justify-between items-center ">
            <h2 className="text-xl font-bold">Edit Personal Details </h2>
            <div className="flex gap-2 items-center">
              <Button
                className=" hover:bg-blue-50 rounded-md p-2"
                onClick={() => {
                  setFirstStep(firstStep - 1);
                }}
              >
                Cancle
              </Button>
              <button className="bg-blue-500 text-white flex gap-2 items-center rounded-sm p-2 px-5"  onClick={() => {handleSave}}>
                <IoSaveSharp className="text-lg" /> Save
              </button>
            </div>
          </div>
          <div className="w-full  flex gap-5 justify-between">
            <div className="p-3 flex flex-col gap-4 w-[65%] min-h-full bg-white shadow-md">
              <h3 className="text-lg font-semibold">Personal Information </h3>

              <form className="flex  flex-col gap-5">
                <div className="w-full flex justify-between gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={hrData?.first_name || ""}
                    className=" border border-gray-400 p-2 w-[50%] outline-none bg-transparent"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    // placeholder="Last Name"
                    value={hrData?.last_name || ""}
                    className=" border border-gray-400 p-2 w-[50%] outline-none bg-transparent"
                    onChange={handleInputChange}

                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    id="dateOfBirth"
                    // Select={hrData.dob}
                    // value={hrData?.dob}
                    value={formattedDOB}
                    className="w-full p-2 bg-transparent border border-gray-400 "
                    onChange={handleInputChange}

                    // style={{ color: "transparent" }}
                  />
                  {/* <label
                    htmlFor="dateOfBirth"
                    className="absolute top-0 left-0 p-2 text-gray-500 "
                  > */}
                    {/* Date Of Birth
                  </label> */}
                </div>
                <div className="flex gap-5 bg-transparent items-center">
                  <Input
                    addonBefore={prefixSelector}
                    value={hrData.number}
                    style={{ width: "50%", backgroundColor: "transparent" }}
                    onChange={handleInputChange}

                  />
                  <div className="">
                    {/* <label htmlFor="gender" className="text-lg bg-transparent">
                Gender:
              </label> */}
                    <Radio.Group id="gender" className="flex  gap-3" value={hrData.gender || ''}>
                      
                      
                      <Radio.Button
                        value="Male"
                        className="bg-transparent border border-gray-400"
                      >
                        Male
                      </Radio.Button>
                      <Radio.Button
                        value="Female"
                        className="bg-transparent border border-gray-400"
                      >
                        Female
                      </Radio.Button>
                      <Radio.Button
                        value="Other"
                        className="bg-transparent border border-gray-400"
                      >
                        Other
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                <div className=" border border-gray-400 p-2 w-full bg-transparent ">
                  {/* Civa.30051@example.com */}
                  {hrData?.email}
                </div>
                <p className="text-sm">
                  to change your email please{" "}
                  <Link href="abcd " className="text-blue-300">
                    Contact Support
                  </Link>{" "}
                </p>
              </form>
            </div>
            <div className="w-[30%] h-fit bg-white px-2 py-6 flex flex-col gap-5 items-center justify-between shadow-md">
              <div className="profile w-20 h-20 bg-yellow-500 rounded-full flex justify-center items-center">
                {/* <span className="text-lg text-orange-600 ">PK</span> */}
              <Image
                src={(hrData?.image) ? (hrData?.image) : Profile}
                className="h-full w-full rounded-full"
                width={100}
                height={100}
                alt="profile"
                onChange={handleImageChange}
              />
              </div>
              <div className="flex flex-col items-center text-center ">
                <p>Make it easier for people to recognize you.</p>
                <span>by Adding a Photo</span>
              </div>
              <div className="image-upload-container">
                <div className="w-full flex justify-center items-center flex-col">
                  <label
                    htmlFor="image-upload-input"
                    className="image-upload-label cursor-pointer bg-blue-400 text-white p-2 rounded-sm"
                  >
                    {image ? image.name : "Add a Photo"}
                  </label>
                  <div style={{ cursor: "pointer" }}>
                    {image ? (
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="upload image"
                        className="img-display-after"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      ""
                    )}
                    <input
                      id="image-upload-input"
                      type="file"
                      onChange={handleImageChange}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Editpersonaldetail;
