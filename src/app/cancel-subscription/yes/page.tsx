"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/SubscriptionCancellation/Header";
import EmployedStep1 from "@/components/SubscriptionCancellation/EmployedUsers/Step1";
import EmployedStep2 from "@/components/SubscriptionCancellation/EmployedUsers/Step2";
import EmployedStep3 from "@/components/SubscriptionCancellation/EmployedUsers/Step3";

export default function CancelYes() {
    const totalSteps = 3;
    const [currentStep, setCurrentStep] = useState(1);
    const [foundViaMM, setFoundViaMM] = useState<"yes" | "no" | null>(null);

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            window.location.href = "/cancel";
        }
    };

    const handleStep1Next = (foundViaMMAnswer: "yes" | "no") => {
        setFoundViaMM(foundViaMMAnswer);
        setCurrentStep(2);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <EmployedStep1 onNext={handleStep1Next} onBack={handleBack} />;
            case 2:
                return <EmployedStep2 onNext={() => setCurrentStep(3)} onBack={handleBack} />;
            case 3:
                return <EmployedStep3 onNext={() => console.log("Flow completed!")} onBack={handleBack} foundViaMM={foundViaMM!} />;
            default:
                return <EmployedStep1 onNext={handleStep1Next} onBack={handleBack} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 p-4 flex items-center justify-center">
            <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                <Header totalSteps={totalSteps} currentStep={currentStep} onBack={handleBack} />
                
                {/* Body */}
                <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-2">
                    {renderStep()}
                    
                    <div className="hidden md:block relative h-56 md:h-auto rounded-xl overflow-hidden">
                        <Image
                            src="/main.jpg"
                            alt="City skyline"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
