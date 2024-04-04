"use client";

import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import { Checkbox, DatePicker, Input, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddEquipment } from "@/redux/slices/Equipment";

import axios from "@/api/axios";
import getAccessTokenFromCookie from "@/utils/getAccessToken";

import Image from "next/image";
import { setEquipmentDetails } from "@/redux/slices/Details";
const { TextArea } = Input;

const Equipments = ({ tab, setTab }) => {
  // const empId = localStorage.getItem("empId");
  // getting employee id from local storage
  const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;

  const [owner, setOwner] = useState(null);
  const [Device, setDevice] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [Notes, setNotes] = useState("");
  const [supplydate, setSupplyDate] = useState("");
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.EquipmentDetails);
  const [provideBy, setProvideBy] = useState("org");
  const accessToken = getAccessTokenFromCookie();
  const [isClient, setIsClient] = useState(false);
  const handleProvideByChange = (e) => {
    setOwner(e.target.value);
    setProvideBy(e.target.value);
  };
  console.log("details", details);

  const isSupplyDateVisible = () => provideBy === true;

  const handleDateChange = (date, dateString) => {
    // const isoString = new Date(dateString).toISOString();

    console.log("Selected Date:", dateString);

    setSupplyDate(dateString);
  };
 useEffect(()=>{
  setIsClient(true)
 },[isClient])
  const StoreEquipment = async () => {

   if(isClient){
  // const empId = localStorage.getItem("empId");
  // const empId = localStorage.getItem("empId");
  console.log("id from localstorage", empId);

    let data =
    //  {
    //   "owner": details.equipment[0].Owner,
    //   "device_type_id": details.equipment[0].device_type_id,
    //   "manufacturer": details.equipment[0].ManufacturerName,
    //   "serial_number": details.equipment[0].SerialNumber,
    //   "note": details.equipment[0].Notes,
    //   "supply_date": details.equipment[0].SupplyDate,
    //   "emp_id": "fd7cbfe2-167c-4f7d-98ca-d4c778721d6e"
    // }

    [
      {
        owner: owner,
        device_type_id: 1,
        manufacturer: Manufacturer,
        serial_number: SerialNumber,
        note: Notes,
        supply_date: supplydate,
        emp_id:  empId ? empId : null,
      },
    ];
  // making data into format to hit api

  try {
    console.log("stored data:", data);
    const response = await axios.put(
      "/employee/equipmentInfo",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("success response", response.data);
    // console.log("response", response);
    if (response.status === 200) {
      console.log("response data to dispatch", response.data);
      // dispatch(AddEquipment(response.data));
      // storing the response in redux
      dispatch(setEquipmentDetails(response.data));
      trueNotification()
      // changing the tab
      setTab(tab + 1);
    }
  } catch (error) {
    console.log("error", error);
    falseNotification()
  }
   }
  };
  const falseNotification = () => {
    notification.open(
      {message: 'please review the details and fill all fields with correct details',}
    );
  };
const trueNotification = () => {
    notification.open(
      {message: 'Equipment data stored,redirected to Document details form',}
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
          <div>
            <Button
              type="primary"
              className="bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF] rounded-none mt-3 p-2 "
            >
              Add Equipment
            </Button>
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
          <form className="w-8/12 mt-0">
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
                // value={formState.devicetype}
                onChange={(e) => {
                  setDevice(e.target.value);
                  console.log("ddeivce", Device);
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
                // value={formState.manufacturerName}
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
                // value={formState.serialnumber}
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
                // value={formState.notes}
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
                  // value={formState.supplyDate}
                  onChange={handleDateChange}
                />
              </div>
            )}
            <div className="flex justify-center gap-4 mt-10 ml-32">
              <Button
                type="dashed"
                // onClick={handleFormSubmit}
                className="border-dashed border border-cyan-600 text-cyan-600 h-8 w-36 text-base"
              >
                Add Items
              </Button>
              <Button
                type="primary"
                className="rounded-md  h-8 w-36 text-base bg-[#1890FF] text-white hover:text-[#1890FF] hover:bg-white  border hover:border-[#1890FF]"
                onClick={() => {
                  StoreEquipment();
                  // setTab(tab + 1)
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
        <div className=" flex gap-5">
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
              Manufacturer Name: <p className="text-black ml-1"></p>
            </h4>
            <h4 className="text-gray-400 mt-1.5 flex" id="output2">
              Serial number: <p className="text-black ml-1"></p>
            </h4>
            <h4 className="text-gray-400 mt-1.5 flex" id="output3">
              Supply Date: <p className="text-black ml-1"></p>
            </h4>
            <h4 className="text-gray-400 mt-1.5 flex" id="output4">
              Notes: <p className="text-black ml-1"></p>
            </h4>
          </div>
          <div className="flex gap-4">
            <Button
              type="editbtn"
              className="text-black rounded-none mt-3 flex h-8 w-24 hover:text-blue-600 hover:border-blue-600 border-gray-300 font-semibold text-base"
            >
              <Image
                src="https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png"
                className="h-4 w-4 mt-1 ml-2"
                alt="Edit Icon"
                width={100}
                height={100}
              />
              <p className="ml-1"> Edit</p>
            </Button>

            <Button
              type="dltbtn"
              className="text-white rounded-none mt-3 bg-red-500 hover:text- hover:border-red-600 border-gray-300 font-semibold text- flex h-8 w-24 justify-center"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                className="h-6 w-6 bg-transparent hover:text-cyan-600"
                alt="Delete Icon"
                width={100}
                height={100}
              />
              <p className="ml-1"> Delete</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipments;