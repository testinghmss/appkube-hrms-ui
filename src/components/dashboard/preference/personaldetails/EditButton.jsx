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
        setFirstStep={setFirstStep}
          firstStep={firstStep}
          fetchedData={hrData}
        />
      )}
      {firstStep == 2 && (
        <Editpersonaldetail
        setFirstStep={setFirstStep}
          firstStep={firstStep}
          fetchedData={hrData}
        />
      )}
    </>
  );
};

export default EditButton;