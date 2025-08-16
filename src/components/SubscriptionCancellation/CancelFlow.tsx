"use client";

import { useRouter } from "next/navigation";
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
import SubscriptionEndMessage from "./UnemployedUsers/SubscriptionEndMessage";
import SubscriptionContinuedMessage from "./SubscriptionContinuedMessage";
import EmployedEndMessage from "./EmployedUsers/SubscriptionEndMessage";

type Choice = "yes" | "no" | null;

export default function CancelFlow() {
  const router = useRouter();
  const [choice, setChoice] = useState<Choice>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [foundViaMM, setFoundViaMM] = useState<"yes" | "no" | null>(null);
  const [hasLawyer, setHasLawyer] = useState<"yes" | "no" | null>(null);
  const [flowCompletedUnemployed, setFlowCompletedUnemployed] = useState(false);
  const [flowCompletedEmployed, setFlowCompletedEmployed] = useState(false);
  const [subscriptionContinued, setSubscriptionContinued] = useState(false);
  const subscriptionEndDate = "XX date";

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

  const handleStep3Next = (hasLawyer: "yes" | "no") => {
    setHasLawyer(hasLawyer);
    setFlowCompletedEmployed(true);
  };

  const choose = (val: "yes" | "no") => {
    setChoice(val);
    setCurrentStep(1);
    setFlowCompletedUnemployed(false);
    setFlowCompletedEmployed(false);
    setSubscriptionContinued(false);
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
            onNext={handleStep3Next}
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
            onOffer={() => setSubscriptionContinued(true)}
          />
        );
      case 2:
        return (
          <UnemployedStep2
            onNext={() => setCurrentStep(3)}
            onBack={handleBack}
            onOffer={() => setSubscriptionContinued(true)}
          />
        );
      case 3:
        return (
          <UnemployedStep3
            onNext={() => setFlowCompletedUnemployed(true)}
            onBack={handleBack}
            onOffer={() => setSubscriptionContinued(true)}
          />
        );
    }
  };

  if (subscriptionContinued) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <SubscriptionContinuedMessage />
        </div>
      </div>
    );
  }

  if (flowCompletedUnemployed) {
    const backFromEnd = () => {
      setFlowCompletedUnemployed(false);
      setCurrentStep(totalSteps);
    };

    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header
            totalSteps={totalSteps}
            currentStep={totalSteps + 1}
            onBack={backFromEnd}
            showProgress
          />
          <SubscriptionEndMessage endDate={subscriptionEndDate} />
        </div>
      </div>
    );
  }

  if (flowCompletedEmployed) {
    const backFromEmployedEnd = () => {
      setFlowCompletedEmployed(false);
      setCurrentStep(totalSteps);
    };

    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header
            totalSteps={totalSteps}
            currentStep={totalSteps + 1}
            onBack={backFromEmployedEnd}
            showProgress
          />
          <EmployedEndMessage hasLawyer={hasLawyer === "yes"} />
        </div>
      </div>
    );
  }

  if (choice === null) {
    return (
      <div className="min-h-screen bg-gray-300 backdrop-blur-sm flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header showProgress={false} />
          <InitialChoice onChoose={choose} />
        </div>
      </div>
    );
  }

  if (choice === "yes") {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
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

  return null;
}
