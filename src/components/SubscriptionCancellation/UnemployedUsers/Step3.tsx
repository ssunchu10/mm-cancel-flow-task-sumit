"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCancelFlowStore } from "@/store/cancelFlowStore";
import { downsellPriceCents } from "@/utils/downsellVariant";
import { callDownsellAcceptedApi } from "@/lib/api/downsellAccepted";
import { cancelSubscriptionApi } from "@/lib/api/cancelSubscription";

const REASONS = [
  "Too expensive",
  "Platform not helpful",
  "Not enough relevant jobs",
  "Decided not to move",
  "Other",
];

export default function UnemployedStep3() {
  const { state, setState } = useCancelFlowStore();
  const csrfToken = state.csrfToken || "";
  const response = state.response || {};
  const subscriptionID = state.subscription?.id;
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [showAmountError, setShowAmountError] = useState(false);
  const [showDetailsError, setShowDetailsError] = useState(false);
  const amountTimeout = useRef<NodeJS.Timeout | null>(null);
  const detailsTimeout = useRef<NodeJS.Timeout | null>(null);

  const subscription = state.subscription;
  const monthlyPrice = subscription?.monthly_price || 0;
  const monthlyPriceFormatted = (monthlyPrice / 100).toFixed(2);
  const downsellPrice = (downsellPriceCents(monthlyPrice || 0) / 100).toFixed(
    2
  );

  const isAmountValid =
    selectedReason === REASONS[0] &&
    amount.trim().length > 0 &&
    /^\d+(\.\d{1,2})?$/.test(amount.trim());

  const isDetailsValid =
    selectedReason &&
    selectedReason !== REASONS[0] &&
    details.trim().length >= 25;

  const canContinue =
    selectedReason === REASONS[0] ? isAmountValid : isDetailsValid;

  useEffect(() => {
    if (selectedReason === REASONS[0] && amount && !isAmountValid) {
      if (amountTimeout.current) clearTimeout(amountTimeout.current);
      amountTimeout.current = setTimeout(() => setShowAmountError(true), 400);
    } else {
      setShowAmountError(false);
      if (amountTimeout.current) clearTimeout(amountTimeout.current);
    }
    return () => {
      if (amountTimeout.current) clearTimeout(amountTimeout.current);
    };
  }, [amount, isAmountValid, selectedReason]);

  useEffect(() => {
    if (
      selectedReason &&
      selectedReason !== REASONS[0] &&
      details.trim().length > 0 &&
      details.trim().length < 25
    ) {
      if (detailsTimeout.current) clearTimeout(detailsTimeout.current);
      detailsTimeout.current = setTimeout(() => setShowDetailsError(true), 400);
    } else {
      setShowDetailsError(false);
      if (detailsTimeout.current) clearTimeout(detailsTimeout.current);
    }
    return () => {
      if (detailsTimeout.current) clearTimeout(detailsTimeout.current);
    };
  }, [details, isDetailsValid, selectedReason]);

  const handleBack = () => {
    setState({ currentStep: 2 });
  };

  const handleOffer = async () => {
    try {
      await callDownsellAcceptedApi();
      setState({ subscriptionContinued: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to accept offer";
      alert(errorMessage);
    }
  };

  async function callCancelSubscriptionApi(
    nextResponse: Record<string, unknown>
  ) {
    try {
      if (!subscriptionID) {
        throw new Error("Subscription ID is missing");
      }

      const result = await cancelSubscriptionApi(
        csrfToken,
        subscriptionID,
        state.user?.id || "",
        nextResponse
      );
      return { ok: true, result };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please try again.";
      return {
        ok: false,
        result: { error: errorMessage },
      };
    }
  }

  const handleNext = async () => {
    if (!canContinue) return;
    const nextResponse = {
      ...response,
      selectedReason,
      amount,
      details,
    };
    const { ok, result } = await callCancelSubscriptionApi(nextResponse);
    if (ok) {
      setState({
        currentStep: 1,
        flowCompletedUnemployed: true,
        response: nextResponse,
      });
      setSelectedReason("");
      setAmount("");
      setDetails("");
    } else {
      alert(result.error || "Failed to cancel subscription");
    }
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
      <h2 className="text-[20px] md:text-[25px] leading-snug font-semibold text-gray-900 mb-2">
        What&apos;s the main reason for cancelling?
      </h2>
      <p className="text-xs md:text-sm text-gray-800 mb-4">
        Please take a minute to let us know why:
      </p>
      <div className="flex flex-col gap-3">
        {selectedReason ? (
          <label
            key={selectedReason}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="cancelReason"
              value={selectedReason}
              checked={true}
              onChange={() => {
                setSelectedReason("");
                setDetails("");
                setAmount("");
              }}
              className="accent-black-600"
            />
            <span className="text-xs md:text-sm  text-gray-900">
              {selectedReason}
            </span>
          </label>
        ) : (
          REASONS.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                checked={false}
                onChange={() => {
                  setSelectedReason(reason);
                  setDetails("");
                  setAmount("");
                }}
                className="accent-black-600"
              />
              <span className="text-xs md:text-sm text-gray-900">{reason}</span>
            </label>
          ))
        )}
      </div>

      {selectedReason === REASONS[0] && (
        <div>
          <label className="block text-[10px] md:text-sm text-gray-800 py-2">
            What would be the maximum you would be willing to pay?*
          </label>
          {showAmountError && (
            <div className="text-[10px] md:text-sm text-red-400 font-semibold pb-2">
              Please enter a valid amount so we can understand your feedback.*
            </div>
          )}
          <div
            className="border border-black rounded flex items-center gap-2 px-2 cursor-text"
            onClick={() => {
              const input = document.getElementById("amount-input");
              if (input) {
                (input as HTMLInputElement).focus();
              }
            }}
          >
            <span className="text-xs font-bold text-gray-500">$</span>
            <input
              id="amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 text-sm text-black outline-none bg-transparent"
            />
          </div>
        </div>
      )}
      {selectedReason && selectedReason !== REASONS[0] && (
        <div>
          <label className="block text-xs md:text-sm text-gray-800 py-2">
            {selectedReason === REASONS[1] &&
              "What can we change to make the platform more helpful?*"}
            {selectedReason === REASONS[2] &&
              "In which way can we make the jobs more relevant?*"}
            {selectedReason === REASONS[3] &&
              "What changed for you to decide to not move?*"}
            {selectedReason === REASONS[4] &&
              "What would have helped you the most?*"}
          </label>
          {showDetailsError && (
            <div className="text-[10px] md:text-sm text-red-400 font-semibold pb-2">
              Please enter at least 25 characters so we can understand your
              feedback.*
            </div>
          )}
          <div className="relative">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter reason here.."
              className="w-full min-h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#8952fc]/30 focus:border-[#8952fc] bg-white text-black text-xs"
              aria-label="Feedback"
            />
            <span
              className={`pointer-events-none absolute bottom-3 right-3 text-[11px] text-gray-500 ${
                details.trim().length < 25 ? "text-red-500" : "text-green-500"
              }`}
            >
              Min 25 characters ({details.trim().length}/25)
            </span>
          </div>
        </div>
      )}
      <hr className="mt-5 border-gray-200" />
      <div className="mt-5 grid gap-3">
        {state.accepted_downsell == false && state.downsell_variant === "B" &&(
          <button
            className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors"
            onClick={handleOffer}
          >
            Get $10 off <span className="font-normal">|</span>{" "}
            <span className="text-white">{downsellPrice}</span>{" "}
            <span className="line-through text-gray-200">
              {monthlyPriceFormatted}
            </span>
          </button>
        )}

        <button
          disabled={!canContinue}
          className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
            canContinue
              ? "bg-red-600 text-white hover:bg-[#7b40fc]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleNext}
        >
          Complete Cancellation
        </button>
      </div>
    </div>
  );
}
