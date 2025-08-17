"use client";

import { useRouter } from "next/navigation";
import { CloseIcon } from "@/components/Icons";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function Header() {
  const router = useRouter();
  const { state } = useCancelFlowStore();
  const choice = state.choice;
  const totalSteps = 3;
  const currentStep = state.currentStep;
  const showProgress = true;
  const flowCompletedEmployed = state.flowCompletedEmployed;
  const flowCompletedUnemployed = state.flowCompletedUnemployed;

  const handleBack = () => {
    if (currentStep > 1) {
      useCancelFlowStore.getState().setState({ currentStep: currentStep - 1 });
    } else {
      useCancelFlowStore
        .getState()
        .setState({ choice: null, currentStep: 1, foundViaMM: null });
    }
  };

  const handleClose = () => {
    router.push("/");
    setTimeout(() => {
      useCancelFlowStore.getState().setState({
        choice: null,
        currentStep: 1,
        foundViaMM: null,
        flowCompletedUnemployed: false,
        flowCompletedEmployed: false,
        subscriptionContinued: false,
      });
    }, 300);
  };

  return (
    <div className="relative border-b border-gray-200 py-2 mt-2 px-4 text-sm text-gray-800 text-bold">
      {showProgress && choice !== null && !flowCompletedEmployed && !flowCompletedUnemployed && (
        <button
          onClick={handleBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hidden md:inline-flex"
        >
          <span className="text-lg">&lt;</span>
          Back
        </button>
      )}

      <div className="hidden md:flex items-center justify-center gap-4">
        <span>
          {flowCompletedEmployed || flowCompletedUnemployed
            ? "Subscription Cancelled"
            : "Subscription Cancellation"}
        </span>
        {(showProgress && choice !== null && (
            <>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => {
                  const idx = i + 1;
                  const pillCompleted =
                    flowCompletedEmployed || flowCompletedUnemployed || idx < currentStep;
                  const isCurrent =
                    !flowCompletedEmployed && idx === currentStep;
                  return (
                    <span
                      key={idx}
                      className={[
                        "h-2 w-8 rounded-full",
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
              <span className="text-xs text-gray-600">
                {flowCompletedEmployed || flowCompletedUnemployed
                  ? "Completed"
                  : `Step ${currentStep} of ${totalSteps}`}
              </span>
            </>
          ))}
      </div>

      <div className="md:hidden flex flex-col items-start gap-2">
        <span>
          {flowCompletedEmployed || flowCompletedUnemployed
            ? "Subscription Cancelled"
            : "Subscription Cancellation"}
        </span>

        {showProgress && choice !== null && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const idx = i + 1;
                const pillCompleted =
                  flowCompletedEmployed || flowCompletedUnemployed || idx < currentStep;
                const isCurrent = !flowCompletedEmployed && idx === currentStep;
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
              {flowCompletedEmployed || flowCompletedUnemployed
                ? "Completed"
                : `Step ${currentStep} of ${totalSteps}`}
            </span>
          </div>
        )}
      </div>

      <button
        aria-label="Close"
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 inline-grid place-items-center h-8 w-8"
      >
        <CloseIcon className="pointer-events-none" />
      </button>
    </div>
  );
}
