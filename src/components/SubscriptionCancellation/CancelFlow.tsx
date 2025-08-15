"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Header from "./Header";
import InitialChoice from "./InitialChoice";
import EmployedStep1 from "./EmployedUsers/Step1";
import EmployedStep2 from "./EmployedUsers/Step2";
import EmployedStep3 from "./EmployedUsers/Step3";
import UnemployedStep1 from "./UnemployedUsers/Step1";
import MainImage from "./MainImage";
import UnemployedStep2 from "./UnemployedUsers/Step2";
import UnemployedStep3 from "./UnemployedUsers/Step3";

type Choice = "yes" | "no" | null;

export default function CancelFlow() {
  const router = useRouter();
  const [choice, setChoice] = useState<Choice>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [foundViaMM, setFoundViaMM] = useState<"yes" | "no" | null>(null);

  const totalSteps = 3;

  const handleBack = () => {
    if ((choice === "yes" || choice === "no") && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if ((choice === "yes" || choice === "no") && currentStep === 1) {
      setChoice(null);
      setCurrentStep(1);
    } else {
      router.push("/");
    }
  };

  const handleStep1Next = (foundViaMMAnswer: "yes" | "no") => {
    setFoundViaMM(foundViaMMAnswer);
    setCurrentStep(2);
  };

  const choose = (val: "yes" | "no") => {
    setChoice(val);
    if (val === "yes") {
      setCurrentStep(1);
    } else {
        setCurrentStep(1);
    }
  };

  const renderEmployedSteps = () => {
    switch (currentStep) {
      case 1:
        return <EmployedStep1 onNext={handleStep1Next} onBack={handleBack} />;
      case 2:
        return (
          <EmployedStep2 onNext={() => setCurrentStep(3)} onBack={handleBack} />
        );
      case 3:
        return (
          <EmployedStep3
            onNext={() => console.log("Flow completed!")}
            onBack={handleBack}
            foundViaMM={foundViaMM!}
          />
        );
    }
  };


  const renderUnemployedSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <UnemployedStep1
            onNext={() => setCurrentStep(2)}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <UnemployedStep2 onNext={() => setCurrentStep(3)} onBack={handleBack} />
        );
      case 3:
        return (
          <UnemployedStep3
            onNext={() => console.log("Flow completed!")}
            onBack={handleBack}
          />
        );
    }
  };

  // Show initial choice if no choice has been made
  if (choice === null) {
    return (
      <div className="min-h-screen bg-gray-300 backdrop-blur-sm p-4 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header showProgress={false} />
          <InitialChoice onChoose={choose} />
        </div>
      </div>
    );
  }

  // Show employed user flow if choice is "yes"
  if (choice === "yes") {
    return (
      <div className="min-h-screen bg-gray-300 p-4 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header
            totalSteps={totalSteps}
            currentStep={currentStep}
            onBack={handleBack}
            showProgress={true}
          />

          <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-3">
            {renderEmployedSteps()}
            <MainImage />
          </div>
        </div>
      </div>
    );
  }

  if (choice === "no") {
    return (
      <div className="min-h-screen bg-gray-300 p-4 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header
            totalSteps={totalSteps}
            currentStep={currentStep}
            onBack={handleBack}
            showProgress={true}
          />

          <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-3">
            {renderUnemployedSteps()}
            <MainImage />
          </div>
        </div>
      </div>
    );
  }

  // TODO: For "no" choice, implement unemployed user flow
  // This will show different steps for users who haven't found a job yet
  // We can create separate components for unemployed users or handle it here
  return null;
}
