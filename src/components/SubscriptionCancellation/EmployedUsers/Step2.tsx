"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function EmployedStep2() {
  const { state, setState } = useCancelFlowStore();
  const response = state.response || {};
  const [feedback, setFeedback] = useState("");

  const [showError, setShowError] = useState(false);
  const errorTimeout = useRef<NodeJS.Timeout | null>(null);

  const resetLocal = () => {
    setFeedback("");
    setShowError(false);
    if (errorTimeout.current) clearTimeout(errorTimeout.current);
  };

  useEffect(() => {
    resetLocal();
  }, [state.currentStep]);

  useEffect(() => {
    const len = feedback.trim().length;
    if (len > 0 && len < 25) {
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
      errorTimeout.current = setTimeout(() => setShowError(true), 400);
    } else {
      setShowError(false);
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
    }
    return () => {
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
    };
  }, [feedback]);

  const canContinue = useMemo(() => feedback.trim().length >= 25, [feedback]);

  const goNext = () => {
    if (!canContinue) return;

    const nextResponse = { ...response, feedback };

    setState({
      currentStep: 3,
      response: nextResponse,
    });

    resetLocal();
  };

  const handleBack = () => {
    setState({
      currentStep: 1,
      response: { ...response },
    });
  };

  return (
    <div className="flex flex-col">
      <button
        className="md:hidden inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 mb-2"
        type="button"
        tabIndex={-1}
        style={{ pointerEvents: "none" }}
      >
        <span
          className="text-lg cursor-pointer"
          onClick={handleBack}
          style={{ pointerEvents: "auto" }}
        >
          &lt;
        </span>
        <span
          className="cursor-pointer"
          onClick={handleBack}
          style={{ pointerEvents: "auto" }}
        >
          Back
        </span>
      </button>

      <h2 className="text-[20px] md:text-[25px] leading-snug font-semibold text-gray-900">
        What&apos;s one thing you wish we could&apos;ve helped you with?
      </h2>

      <hr className="md:hidden mt-3 mb-3 border-gray-200" />

      <p className="text-xs md:text-sm text-black mt-2">
        We&apos;re always looking to improve, your thoughts can help us make Migrate
        Mate more useful for others.*
      </p>

      {showError && (
        <div
          className="text-[10px] mt-2 md:text-sm text-red-400 font-semibold pb-2"
          aria-live="polite"
        >
          Please enter at least 25 characters so we can understand your feedback.*
        </div>
      )}

      <div className="mt-1 relative">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder=""
          className="w-full min-h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#8952fc]/30 focus:border-[#8952fc] bg-white text-black text-xs"
          aria-label="Feedback"
          onBlur={() => {
            const len = feedback.trim().length;
            if (len > 0 && len < 25) setShowError(true);
          }}
        />
        <span
          className={`pointer-events-none absolute bottom-3 right-3 text-[11px] ${
            feedback.trim().length < 25 ? "text-red-500" : "text-green-500"
          }`}
        >
          Min 25 characters ({feedback.trim().length}/25)
        </span>
      </div>

      <hr className="hidden md:block mt-3 mb-3 border-gray-200" />

      <button
        onClick={goNext}
        disabled={!canContinue}
        className={
          "w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors mt-2 " +
          (canContinue
            ? "bg-red-600 text-white hover:bg-[#7b40fc]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed")
        }
      >
        Continue
      </button>
    </div>
  );
}
