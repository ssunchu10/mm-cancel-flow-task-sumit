"use client";

import { useRouter } from "next/navigation";
import { CloseIcon } from "@/components/Icons";

interface HeaderProps {
  totalSteps?: number;
  currentStep?: number;
  onBack?: () => void;
  showProgress?: boolean;
}

export default function Header({
  totalSteps = 3,
  currentStep = 1,
  onBack,
  showProgress = true,
}: HeaderProps) {
  const router = useRouter();
  const isCompleted = currentStep > totalSteps;

  return (
    <div className="relative border-b border-gray-200 py-2 mt-2 px-4 text-sm text-gray-800 text-bold">
      {showProgress && onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hidden md:inline-flex"
        >
          <span className="text-lg">&lt;</span>
          Back
        </button>
      )}

      <div className="hidden md:flex items-center justify-center gap-4">
        <span>Subscription Cancellation</span>
        {showProgress && (
          <>
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
                      isCompleted
                        ? "bg-green-500"
                        : isCurrent
                        ? "bg-gray-400"
                        : "bg-gray-200",
                    ].join(" ")}
                  />
                );
              })}
            </div>
            <span className="text-xs text-gray-600">
              {isCompleted
                ? "Completed"
                : `Step ${currentStep} of ${totalSteps}`}
            </span>
          </>
        )}
      </div>

      <div className="md:hidden flex flex-col items-start gap-2">
        <span className="text-sm text-gray-700">Subscription Cancellation</span>

        {showProgress && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const idx = i + 1;
                const pillCompleted = isCompleted || idx < currentStep;
                const isCurrent = !isCompleted && idx === currentStep;
                return (
                  <span
                    key={idx}
                    className={[
                      "h-2 w-5 rounded-full",
                      pillCompleted
                        ? "bg-green-500"
                        : isCurrent
                        ? "bg-gray-400"
                        : "bg-gray-200",
                    ].join(" ")}
                  />
                );
              })}
            </div>

            <span className="text-xs text-gray-600 whitespace-nowrap shrink-0 ml-2">
              {isCompleted
                ? "Completed"
                : `Step ${currentStep} of ${totalSteps}`}
            </span>
          </div>
        )}
      </div>

      <button
        aria-label="Close"
        onClick={() => router.push("/")}
        className="absolute right-4 top-1/2 -translate-y-1/2 inline-grid place-items-center h-8 w-8"
      >
        <CloseIcon className="pointer-events-none" />
      </button>
    </div>
  );
}
