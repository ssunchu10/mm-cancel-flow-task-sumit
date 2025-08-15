"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
    totalSteps: number;
    currentStep: number;
    onBack: () => void;
}

export default function Header({ totalSteps, currentStep, onBack }: HeaderProps) {
    const router = useRouter();

    return (
        <div className="relative border-b border-gray-300 py-3 px-4 text-sm text-gray-800 text-bold">
            {/* Back button - visible on desktop only */}
            <button
                onClick={onBack}
                className="absolute left-4 top-1/2 -translate-y-1/2 items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hidden md:inline-flex"
            >
                <span className="text-lg">&lt;</span>
                Back
            </button>

            {/* Desktop: horizontal layout */}
            <div className="hidden md:flex items-center justify-center gap-4">
                <span>Subscription Cancellation</span>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalSteps }).map((_, i) => {
                        const idx = i + 1;
                        const isCompleted = idx < currentStep;
                        const isCurrent = idx === currentStep;
                        return (
                            <span
                                key={idx}
                                className={[
                                    "h-2 w-8 rounded-full",
                                    isCompleted ? "bg-green-500" : isCurrent ? "bg-gray-400" : "bg-gray-200",
                                ].join(" ")}
                            />
                        );
                    })}
                </div>
                <span className="text-xs text-gray-600">Step {currentStep} of {totalSteps}</span>
            </div>

            {/* Mobile: vertical layout */}
            <div className="md:hidden flex flex-col items-start gap-2">
                <span className="text-sm text-gray-700">Subscription Cancellation</span>

                {/* row inside the column */}
                <div className="flex items-center justify-between min-w-0 gap-2">
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalSteps }).map((_, i) => {
                            const idx = i + 1;
                            const isCompleted = idx < currentStep;
                            const isCurrent = idx === currentStep;
                            return (
                                <span
                                    key={idx}
                                    className={[
                                        "h-2 w-5 rounded-full",
                                        isCompleted ? "bg-green-500" : isCurrent ? "bg-gray-400" : "bg-gray-200",
                                    ].join(" ")}
                                />
                            );
                        })}
                    </div>

                    <span className="text-xs text-gray-600 whitespace-nowrap shrink-0 ml-2">
                        Step {currentStep} of {totalSteps}
                    </span>
                </div>
            </div>

            <button
                aria-label="Close"
                onClick={() => router.push("/")}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-grid place-items-center h-8 w-8"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" className="pointer-events-none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
} 