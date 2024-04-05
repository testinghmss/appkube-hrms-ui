import React, { useState } from "react";
import Editpersonaldetail from "./Editpersonaldetail";
import PersonalDetail from "./Personaldetail";

const EditButton = ({fetchedData}) => {
  const [firstStep, setFirstStep] = useState(1);
  const [hrData, setHrData] = useState(fetchedData)
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