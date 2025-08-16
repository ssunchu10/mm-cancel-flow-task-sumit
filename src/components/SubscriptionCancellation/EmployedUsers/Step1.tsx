"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const GRID_OPTIONS = {
    foundViaMM: ["yes", "no"] as const,
    appliedCount: ["0", "1 - 5", "6 - 20", "20+"] as const,
    emailedCount: ["0", "1 - 5", "6 - 20", "20+"] as const,
    interviewedCount: ["0", "1 - 2", "3 - 5", "5+"] as const
};

const DEFAULT_STATES = {
    foundViaMM: null as "yes" | "no" | null,
    appliedCount: undefined as "0" | "1 - 5" | "6 - 20" | "20+" | undefined,
    emailedCount: undefined as "0" | "1 - 5" | "6 - 20" | "20+" | undefined,
    interviewedCount: undefined as "0" | "1 - 2" | "3 - 5" | "5+" | undefined
};

interface EmployedStep1Props {
    onNext: (foundViaMM: "yes" | "no") => void;
    onBack: () => void;
}

export default function EmployedStep1({ onNext, onBack }: EmployedStep1Props) {
    const router = useRouter();

    const [foundViaMM, setFoundViaMM] = useState(DEFAULT_STATES.foundViaMM);
    const [appliedCount, setAppliedCount] = useState(DEFAULT_STATES.appliedCount);
    const [emailedCount, setEmailedCount] = useState(DEFAULT_STATES.emailedCount);
    const [interviewedCount, setInterviewedCount] = useState(DEFAULT_STATES.interviewedCount);

    const canContinue = useMemo(
        () => !!(foundViaMM && appliedCount && emailedCount && interviewedCount),
        [foundViaMM, appliedCount, emailedCount, interviewedCount]
    );

    const goNext = () => {
        if (!canContinue) return;
        onNext(foundViaMM!);
    };

    return (
        <div className="flex flex-col">
            {/* Back button - visible on mobile only */}
            <button
                onClick={onBack}
                className="md:hidden inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-2"
            >
                <span className="text-lg">&lt;</span>
                Back
            </button>

            <h2 className="text-[19px] md:text-[25px] leading-snug font-semibold text-gray-900">Congrats on the new role! 🎉</h2>

            <hr className="md:hidden mt-2 mb-2 border-gray-200" />
            {/* Q1 */}
            <div className="mt-2">
                <p className="text-xs md:text-sm text-gray-800 mb-2">
                    Did you find this job with MigrateMate? <span className="text-black">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {GRID_OPTIONS.foundViaMM.map((v) => (
                        <button
                            key={v}
                            onClick={() => setFoundViaMM(v)}
                            className={[
                                "rounded-lg border px-4 py-3 text-xs md:text-sm text-black",
                                foundViaMM === v
                                    ? "border-[#8952fc] bg-purple-50"
                                    : "border-gray-300 bg-gray-200 hover:bg-gray-300",
                            ].join(" ")}
                        >
                            {v === "yes" ? "Yes" : "No"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q2 */}
            <div className="mt-5">
                <p className="text-xs md:text-sm text-gray-800 mb-2">
                    How many roles did you apply for through Migrate Mate? <span className="text-black">*</span>
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {GRID_OPTIONS.appliedCount.map((v) => (
                        <button
                            key={v}
                            onClick={() => setAppliedCount(v)}
                            className={[
                                "rounded-lg border px-4 py-3 text-xs md:text-sm text-black",
                                appliedCount === v
                                    ? "border-[#8952fc] bg-purple-50"
                                    : "border-gray-300 bg-gray-200 hover:bg-gray-300",
                            ].join(" ")}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q3 */}
            <div className="mt-5">
                <p className="text-xs md:text-sm text-gray-800 mb-2">
                    How many companies did you email directly? <span className="text-black">*</span>
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {GRID_OPTIONS.emailedCount.map((v) => (
                        <button
                            key={v}
                            onClick={() => setEmailedCount(v)}
                            className={[
                                "rounded-lg border px-4 py-3 text-xs md:text-sm text-black",
                                emailedCount === v
                                    ? "border-[#8952fc] bg-purple-50"
                                    : "border-gray-300 bg-gray-200 hover:bg-gray-300",
                            ].join(" ")}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q4 */}
            <div className="mt-5">
                <p className="text-xs md:text-sm text-gray-800 mb-2">
                    How many different companies did you interview with? <span className="text-black">*</span>
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {GRID_OPTIONS.interviewedCount.map((v) => (
                        <button
                            key={v}
                            onClick={() => setInterviewedCount(v)}
                            className={[
                                "rounded-lg border px-4 py-3 text-xs md:text-sm text-black",
                                interviewedCount === v
                                    ? "border-[#8952fc] bg-purple-50"
                                    : "border-gray-300 bg-gray-200 hover:bg-gray-300",
                            ].join(" ")}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>
            
            <hr className="mt-5 border-gray-200" />

            <div className="mt-5">
                <button
                    onClick={goNext}
                    disabled={!canContinue}
                    className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${canContinue
                        ? "bg-[#8952fc] text-white hover:bg-[#7b40fc]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
} 