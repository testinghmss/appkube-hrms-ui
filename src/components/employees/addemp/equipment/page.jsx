
'use client'

import React, { useEffect, useState } from "react";
import { Button, notification ,message} from "antd";
import { useRouter } from "next/navigation";
import { Checkbox, DatePicker, Input, Radio, Select } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { AddEquipment, deleteequipement, clearEquipment } from "@/redux/slices/Equipment";
import moment from "moment";

import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";

import Image from "next/image";
const { TextArea } = Input;



const Equipments = ({ tab, setTab }) => {
  const [owner, setOwner] = useState(null);
  const [Device, setDevice] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [Notes, setNotes] = useState("");
  const [supplydate, setSupplyDate] = useState("");
  const router = useRouter();
  // const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [provideBy, setProvideBy] = useState("org");
  const accessToken = getAccessTokenFromCookie();

  // const handleProvideByChange = (e) => {
  //   setOwner(e.target.value)
  //   setProvideBy(e.target.value);
  //   console.log(owner)
  // };

  // Function to reset the form
  const resetForm = () => {
    setOwner(null);
    setDevice("");
    setManufacturer("");
    setSerialNumber("");
    setNotes("");
    setSupplyDate("");
    setProvideBy("org");
  };


  useEffect(() => {
    // Reset form upon component mount
    resetForm();
    dispatch(clearEquipment());
  }, []);

  const handleProvideByChange = (e) => {
    const value = e.target.value;
    console.log("Selected value:", value); // Add this line
    setProvideBy(value);
    // Convert the string value to boolean
    setOwner(value === "true");
  };
  

  const id = useSelector((state) => state.Details.id)
  // const empId = localStorage.getItem("empId");
  const empId = typeof window !== 'undefined' ? localStorage.getItem('empId') : null;

  console.log("ID", empId)
  const details = useSelector((state) => state.EquipmentDetails);
  let organizationDetails = details.organization
  console.log(organizationDetails)

  const isSupplyDateVisible = () => provideBy === true;

  const handleDateChange = (date, dateString) => {
    console.log('Selected Date:', dateString);
    setSupplyDate(dateString);
  };



  const sendData = () => {


    const data = {
      owner: provideBy,
      Device: Device,
      Manufacturer: Manufacturer,
      SerialNumber: SerialNumber,
      Notes: Notes,
      Date: supplydate
    }
    console.log("data in the sendData",data)
    dispatch(AddEquipment(data))


    // Call resetForm to clear the form fields
    resetForm();
  }

  const handledelete = (id) => {
    console.log(id)
    dispatch(deleteequipement(id))
  }
  const [formState, setformstate] = useState();

  const handleedit = (data) => {
    setOwner(data.owner);
    setDevice(data.Device);
    setManufacturer(data.Manufacturer);
    setSerialNumber(data.SerialNumber);
    setNotes(data.Notes);
    setSupplyDate(data.Date);

    setProvideBy(data.owner);

    dispatch(clearEquipment());
  };
  console.log("send data ",formState)


  const callApi = async () => {
    const dataArray = []; // Initialize an empty array to store data objects

    for (const item of organizationDetails) {
      let data;

      if (item.owner === true) {
        data = {
          owner: item.owner,
          device_type_id: 1,
          manufacturer: item.Manufacturer,
          serial_number: item.SerialNumber,
          note: item.Notes,
          supply_date: new Date(item.Date).toISOString(), // Convert date to ISO string
          emp_id: empId
        };
      } else {
        data = {
          owner: item.owner,
          device_type_id: 1,
          manufacturer: item.Manufacturer,
          serial_number: item.SerialNumber,
          note: item.Notes,
          emp_id: empId
        };
      }

      dataArray.push(data);
    }

    console.log("Data Array", dataArray); // Log the array before sending it

    try {
      if (dataArray) {
        const response = await axios.put("/employee/equipmentInfo", dataArray, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("success", response.data);


        if (response.status === 200) {
          trueNotification()
          setTab(tab + 1);
          dispatch(clearEquipment());

        }
      }
      else {
        message.open(
          {type:'error', content: 'please first add items to upload', }
        );

      }
    } catch (error) {
      console.log("error", error);
      falseNotification()
    }
  }

  const falseNotification = () => {
    message.open(
      {type:'error', content: 'please review the details and fill all fields with correct details', }
    );
  };
  const trueNotification = () => {
    message.open(
      {type:'success', content: 'Equipment data stored,redirected to Document details form', }
    );
  };

  return (
    <div>
      <div
        style={{
          padding: 24,
          minHeight: 100,
          background: "white",
          marginTop: 30,
          marginLeft: 10,
        }}
      >
        <div className=" flex gap-5">
          <div>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/68/68792.png"
              className="h-8 w-10"
              alt="nothing"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full">
            <h1 className="text-xl">
              <b>Equipment</b>
            </h1>
            <p className="text-gray-400 mt-1.5">
              Provide your own equipment and keep track of it for seamless work
              experiences
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 24,
          minHeight: 300,
          background: "white",
          marginTop: 30,
          marginLeft: 10,
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-96">
          <form
            className="w-8/12 mt-0"
          >
            <div className="mb-4 flex items-center">
              <label className="text-sm font-medium w-32 min-w-44">
                Device Provide by:
              </label>
              <div className="flex ml-2 mb-2">
                <Radio.Group onChange={handleProvideByChange} value={provideBy}>
                  <Radio value={true} className="font-medium">
                    Own by organization
                  </Radio>
                  <Radio value={false} className="font-medium">
                    Own by worker
                  </Radio>
                </Radio.Group>

              </div>
            </div>
            <div className="mb-6 flex items-center">
              <label
                className="text-sm font-medium w-32 min-w-44 mb-2"
                htmlFor="deviceType"
              >
                Device Type:
              </label>
              <Input
                style={{ width: "100%" }}
                className="border py-2 px-3 hover:border-sky-600 ml-2 mb-2 h-8"
                name="devicetype"
                type="text"
                placeholder="Laptop"
                value={Device}
                onChange={(e) => {
                  setDevice(e.target.value)
                }}
              />
            </div>
            <div className="mb-6 flex items-center">
              <label
                className="text-sm font-medium w-32 min-w-44 mb-2"
                htmlFor="manufacturerName"
                id="manufacturername"
              >
                Manufacturer Name:
              </label>
              <Input
                style={{ width: "100%" }}
                className="border  hover:border-sky-600 py-2 px-3 mb-3 h-8 ml-2"
                name="manufacturerName"
                type="text"
                placeholder="Hp Laptop"
                value={Manufacturer}
                onChange={(e) => {
                  setManufacturer(e.target.value);
                }}
              />
            </div>
            <div className="mb-6 flex items-center">
              <label
                className="text-sm font-medium w-32 min-w-44 mb-2"
                htmlFor="serialnumber"
                id="serialnumber"
              >
                Serial number:
              </label>
              <Input
                style={{ width: "100%" }}
                className="border hover:border-sky-600 py-2 px-3 mb-2 h-8 ml-2"
                name="serialnumber"
                type="text"
                placeholder="First Name"
                value={SerialNumber}
                onChange={(e) => {
                  setSerialNumber(e.target.value);
                }}
              />
            </div>
            <div className="mb-6 flex items-center">
              <label
                className="text-sm font-medium w-32 min-w-44"
                htmlFor="notes"
              >
                Notes:
              </label>
              <TextArea
                style={{ width: "100%" }}
                className="border  hover:border-sky-600 py-2 px-3 mb-2 ml-2"
                name="notes"
                placeholder="Design"
                rows={4}
                value={Notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>


            {isSupplyDateVisible() && (
              <div className="mb-6 flex items-center">
                <label
                  className="text-sm font-medium w-32 min-w-44 mb-2"
                  htmlFor="supplyDate"
                >
                  Supply Date:
                </label>
                <DatePicker
                  name="supplyDate"
                  className="border flex-1 hover:border-sky-600 ml-2 mb-2"
                  placeholder="Select date"
                  value={supplydate ? moment(supplydate, "YYYY-MM-DD") : null}
                  onChange={handleDateChange}
                />
              </div>
            )}


            <div className="flex justify-center gap-4 mt-10 ml-32">
              <Button
                type="dashed"
                // onClick={handleFormSubmit}
                className="border-dashed border border-cyan-600 text-cyan-600 h-8 w-36 text-base"
                onClick={sendData}
              >
                Add Items
              </Button>
              <Button
                type="primary"
                className="rounded-md  h-8 w-36 text-base bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF]"
                onClick={() => {
                  // StoreEquipment();
                  callApi()
                  handledelete(SerialNumber)
                }}
              >
                Next
              </Button>
            </div>
          </form>
        </div>

      </div>

      <div
        style={{
          padding: 24,
          minHeight: 120,
          background: "white",
          marginTop: 30,
          marginLeft: 10,
        }}
      >
        <div className="">
          {Array.isArray(organizationDetails) && organizationDetails.length > 0 ? (
            organizationDetails.map((data, index) => (
              <div className="flex flex-col gap-5 mt-5" key={index}>
                <div>
                  {data.owner ? (
                    <h1 className="text-center font-semibold text-xl">Own by Organization</h1>
                  ) : (
                    <h1 className="text-center font-semibold text-xl">Own by Worker</h1>
                  )}
                </div>
                <div className="flex gap-5 mt-5">
                  <div className="bg-cyan-400 h-12 w-16 rounded-full">
                    <Image
                      src="https://www.iconpacks.net/icons/1/free-keyboard-icon-1405-thumb.png"
                      className="rounded-xl h-6 w-6 ml-2.5 mt-3"
                      alt="Equipment Icon"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="text-xl">
                      <b></b>
                    </h1>
                    <h4 className="text-gray-400 mt-1.5 flex" id="output1">
                      Manufacturer Name: <p className="text-black ml-1">{data.Manufacturer}</p>
                    </h4>
                    <h4 className="text-gray-400 mt-1.5 flex" id="output2">
                      Serial number: <p className="text-black ml-1">{data.SerialNumber}</p>
                    </h4>
                    {data.owner && data.Date && (
                      <h4 className="text-gray-400 mt-1.5 flex" id="output3">
                        Supply Date: <p className="text-black ml-1">{data.Date}</p>
                      </h4>
                    )}
                    <h4 className="text-gray-400 mt-1.5 flex" id="output4">
                      Notes: <p className="text-black ml-1">{data.Notes}</p>
                    </h4>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="editbtn"
                      className="text-black rounded-none mt-3 h-8 w-24 flex items-center hover:text-blue-600 hover:border-blue-600 border-gray-300 font-semibold text-base"
                      icon={<EditOutlined />}
                      onClick={() => { handleedit(data); console.log("hello edit"); }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="danger"
                      className="text-white rounded-none mt-3 flex items-center bg-red-500 hover:text-red-600 hover:border-red-600 border-gray-300 font-semibold h-8 w-24"
                      onClick={() => handledelete(data.SerialNumber)}
                      style={{ background: "rgb(245, 0, 0)", color: "white" }}
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-black">Loading.....</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipments;