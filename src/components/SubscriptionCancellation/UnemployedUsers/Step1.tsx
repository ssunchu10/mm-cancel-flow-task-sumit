"use client";

import { useCancelFlowStore } from "@/store/cancelFlowStore";
import { useState, useEffect } from "react";

export default function UnemployedStep1() {
  const { state, setState } = useCancelFlowStore();
  const response = state.response || {};
  const [offerAccepted, setOfferAccepted] = useState(
    response.offerAccepted ?? false
  );

  useEffect(() => {
    setOfferAccepted(response.offerAccepted ?? false);
  }, [response]);

  const handleOffer = () => {
    setOfferAccepted(true);
    setState({
      response: {
        ...response,
        offerAccepted: true,
      },
      subscriptionContinued: true,
    });
  };

  const handleBack = () => {
    setState({ currentStep: 1, choice: null });
  };

  const handleNext = () => {
    setOfferAccepted(false);
    setState({
      response: {
        ...response,
        offerAccepted: false,
      },
      currentStep: 2,
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

      <h2 className="text-[20px] md:text-[25px] leading-snug font-semibold text-gray-900 mb-3">
        We built this to help you land the job, this makes it a little easier.
      </h2>
      <p className="md:block hidden text-gray-600 font-semibold mb-5 mt-2">
        We've been there and we're here to help you.
      </p>

      <div className="bg-purple-100 border border-purple-300 rounded-xl p-3 mb-3 md:text-center">
        <div className="text-3xl md:text-xl font-semibold mb-1 text-black">
          Here's 50% off until you find a job.
        </div>
        <div className="flex items-center md:justify-center gap-4 mb-2">
          <div className="text-lg font-bold text-purple-500">$12.50/month</div>
          <div className="text-black line-through">$25/month</div>
        </div>
        <button
          className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors mb-2"
          onClick={handleOffer}
        >
          Get 50% off
        </button>
        <div className="text-[10px] md:text-xs text-center text-black italic">
          You wont be charged until your next billing date.
        </div>
      </div>

      <hr className="mt-2 mb-2 border-gray-200" />

      <button
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 text-gray-700 font-semibold bg-white hover:bg-gray-100 transition"
        onClick={handleNext}
      >
        No thanks
      </button>
    </div>
  );
}
