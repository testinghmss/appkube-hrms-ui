"use client";
import CompanyDetails from "@/components/onboard/CompanyDetails";
import Onboarding from "@/components/onboard/Onboarding";
import PreviewDetails from "@/components/onboard/PreviewDetails";
import { useState } from "react";
import {useRouter} from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  return (
    <div>
      {step == 1 && <Onboarding step={step} setStep={setStep} />}
      {step == 2 && <CompanyDetails step={step} setStep={setStep} />}
      {step == 3 && <PreviewDetails step={step} setStep={setStep}/>}
      {step == 4 && router.push("/hrms")}
    </div>
  );
};

export default Page;
