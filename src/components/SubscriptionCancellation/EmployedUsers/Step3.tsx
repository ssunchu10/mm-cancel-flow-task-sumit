"use client";

import { useMemo, useState, useEffect, use } from "react";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function EmployedStep3() {
  const { state, setState } = useCancelFlowStore();
  const response = state.response || {};
  const foundViaMM = response.foundViaMM as "yes" | "no" | undefined;

  const [hasLawyer, setHasLawyer] = useState<"yes" | "no" | null>(null);
  const [visa, setVisa] = useState<string>("");

  const canSubmit = useMemo(
    () => !!hasLawyer && visa.trim().length > 0,
    [hasLawyer, visa]
  );

  const resetLocal = () => {
    setHasLawyer(null);
    setVisa("");
  };

  const complete = () => {
    if (!canSubmit) return;

    const nextResponse = {
      ...response,
      hasLawyer,
      visa,
    };

    setState({
      currentStep: 1,
      flowCompletedEmployed: true,
      response: nextResponse,
    });

    console.log("saved response (final):", nextResponse);
    resetLocal();
  };

  const handleBack = () => {
    setState({
      currentStep: 2,
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
        {foundViaMM === "yes" ? (
          <span>
            We helped you land the job, now let's help you secure your visa.
          </span>
        ) : (
          <>
            <span>You landed the job!</span>
            <br className="sm:block" />
            <em className="italic">That's what we live for.</em>
          </>
        )}
      </h2>

      {foundViaMM === "no" && (
        <p className="text-xs md:text-sm text-black font-semibold mt-2">
          Even if it wasn't through Migrate Mate,
          <br className="sm:block" />
          let us help get your visa sorted.
        </p>
      )}

      <hr className="md:hidden mt-2 mb-2 border-gray-200" />

      <p className="text-xs md:text-sm text-black mt-2">
        Is your company providing an immigration lawyer to help with your visa?
      </p>

      <div className="mt-4 space-y-3">
        {!hasLawyer || hasLawyer === "yes" ? (
          <label className="flex items-center gap-3 text-sm text-gray-900">
            <input
              type="radio"
              name="hasLawyer"
              className="h-4 w-4"
              checked={hasLawyer === "yes"}
              onChange={() => setHasLawyer("yes")}
            />
            Yes
          </label>
        ) : null}

        {!hasLawyer || hasLawyer === "no" ? (
          <label className="flex items-center gap-3 text-sm text-gray-900">
            <input
              type="radio"
              name="hasLawyer"
              className="h-4 w-4"
              checked={hasLawyer === "no"}
              onChange={() => setHasLawyer("no")}
            />
            No
          </label>
        ) : null}
      </div>

      {hasLawyer && (
        <div className="mt-1">
          {hasLawyer === "no" ? (
            <p className="text-xs md:text-sm text-black mb-2">
              We can connect you with one of our trusted partners.
              <br className="hidden md:block" />
              Which visa would you like to apply for?*
            </p>
          ) : (
            <p className="text-xs md:text-sm text-black mb-2">
              What visa will you be applying for?*
            </p>
          )}

          <input
            type="text"
            value={visa}
            onChange={(e) => setVisa(e.target.value)}
            placeholder="Enter visa type"
            className="w-full rounded-lg border border-gray-300 text-xs text-black bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8952fc]/30 focus:border-[#8952fc]"
          />
        </div>
      )}

      <hr className="mt-6 mb-4 border-gray-200" />

      <button
        onClick={complete}
        disabled={!canSubmit}
        className={
          "w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors " +
          (canSubmit
            ? "bg-red-600 text-white hover:bg-[#7b40fc]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed")
        }
      >
        Complete cancellation
      </button>
    </div>
  );
}
