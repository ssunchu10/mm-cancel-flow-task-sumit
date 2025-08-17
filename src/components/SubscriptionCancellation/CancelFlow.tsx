"use client";

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
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function CancelFlow() {
  const { state } = useCancelFlowStore();
  const {
    choice = null,
    currentStep = 1,
    flowCompletedUnemployed = false,
    flowCompletedEmployed = false,
    subscriptionContinued = false,
  } = state as any;

  const renderEmployedSteps = () => {
    switch (currentStep) {
      case 1:
        return <EmployedStep1 />;
      case 2:
        return <EmployedStep2 />;
      case 3:
        return <EmployedStep3 />;
    }
  };

  const renderUnemployedSteps = () => {
    switch (currentStep) {
      case 1:
        return <UnemployedStep1 />;
      case 2:
        return <UnemployedStep2 />;
      case 3:
        return <UnemployedStep3 />;
      default:
        return null;
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

  if (flowCompletedUnemployed && choice != null) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header />
          <SubscriptionEndMessage />
        </div>
      </div>
    );
  }

  if (flowCompletedEmployed && choice != null) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header />
          <EmployedEndMessage />
        </div>
      </div>
    );
  }

  if (choice === null) {
    return (
      <div className="min-h-screen bg-gray-300 backdrop-blur-sm flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header />
          <InitialChoice />
        </div>
      </div>
    );
  }

  if (choice === "yes") {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <Header />
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
          <Header />
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
