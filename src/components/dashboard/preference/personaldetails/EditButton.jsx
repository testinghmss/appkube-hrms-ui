'use client'
import React, { useState,useEffect } from "react";
import Editpersonaldetail from "./Editpersonaldetail";
import PersonalDetail from "./Personaldetail";

const EditButton = ({fetchedData}) => {
  const [firstStep, setFirstStep] = useState(1);
  const [hrData, setHrData] = useState(fetchedData)
  
  useEffect(() => {
      setHrData(fetchedData); // Update hrData when fetchedData changes
    }, [fetchedData]);
    
    console.log("in edit button",hrData);
  return (
    <>
      {firstStep == 1 && (
        <PersonalDetail
        fetchedData={fetchedData}
        setFirstStep={setFirstStep}
          firstStep={firstStep}
        />
      )}
      {firstStep == 2 && (
        <Editpersonaldetail
        hrData={fetchedData}
        setFirstStep={setFirstStep}
          firstStep={firstStep}
        />
      )}
    </>
  );
};

export default EditButton;