"use client";

import { useMemo, useState } from "react";

const GRID_OPTIONS = {
  appliedCount: ["0", "1-5", "6-20", "20+"] as const,
  emailedCount: ["0", "1-5", "6-20", "20+"] as const,
  interviewedCount: ["0", "1-2", "3-5", "5+"] as const,
};

export interface Step2Props {
  onNext?: () => void;
  onBack?: () => void;
}

export default function UnemployedStep2({ onNext, onBack }: Step2Props) {
  const [appliedCount, setAppliedCount] = useState<string | undefined>(
    undefined
  );
  const [emailedCount, setEmailedCount] = useState<string | undefined>(
    undefined
  );
  const [interviewedCount, setInterviewedCount] = useState<string | undefined>(
    undefined
  );

  const canContinue = useMemo(
    () => !!(appliedCount && emailedCount && interviewedCount),
    [appliedCount, emailedCount, interviewedCount]
  );

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

      <h2 className="text-[20px] md:text-[25px] leading-snug font-semibold text-gray-900 mb-2">
        <span className="md:hidden">
          What's the main reason for cancelling?
        </span>

        <span className="hidden md:inline">
          Help us understand how you were using Migrate Mate.
        </span>
      </h2>

      {/* Q2 */}
      <div className="mt-2">
        <p className="text-xs md:text-sm text-gray-800 mb-2">
          How many roles did you apply for through Migrate Mate?{" "}
          <span className="text-black">*</span>
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
          How many companies did you email directly?{" "}
          <span className="text-black">*</span>
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
          How many different companies did you interview with?{" "}
          <span className="text-black">*</span>
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

      <div className="mt-5 grid gap-3">
        <button
          className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors"
          //   onClick={onNext}
        >
          Get 50% off <span className="font-normal">|</span>{" "}
          <span className="text-white">$12.50</span>{" "}
          <span className="line-through text-gray-200">$25</span>
        </button>
        <button
          disabled={!canContinue}
          className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
            canContinue
              ? "bg-red-600 text-white hover:bg-[#7b40fc]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={canContinue ? onNext : undefined}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
