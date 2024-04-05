"use client";
import CompanyDetails from "@/components/onboard/CompanyDetails";
import Onboarding from "@/components/onboard/Onboarding";
import PreviewDetails from "@/components/onboard/PreviewDetails";
import { useState } from "react";
import {useRouter} from "next/navigation";
import React from "react";

import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const personalStatus = useSelector(state => state.Onboardingpersdetails.personalStatus)
  const companyStatus = useSelector(state => state.Onboardingpersdetails.companyStatus)

  // Function to handle navigation based on status
  const handleNavigation = () => {
    if (personalStatus === 200 && companyStatus === 200) {
      router.push("/hrms"); // Navigate to HRMS if both statuses are 200
    } else {
      setStep(1)
      // router.push("/onboarding"); // Navigate to onboarding if statuses are not 200
    }
  };

  return (
    <div>
      {step == 1 && <Onboarding step={step} setStep={setStep} />}
      {step == 2 && <CompanyDetails step={step} setStep={setStep} />}
      {step == 3 && <PreviewDetails step={step} setStep={setStep}/>}
      {step == 4 && router.push("/hrms")}

      {/* {(step == 4 && personalStatus == 200 && companyStatus == 200 ) ? router.push("/hrms") : router.push("/onboarding")} */}
      {/* {step === 4 && handleNavigation} */}
    </div>
  );
};

export default Page;
