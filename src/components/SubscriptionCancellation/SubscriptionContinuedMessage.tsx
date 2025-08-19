"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { CloseIcon } from "../Icons";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function SubscriptionContinuedMessage() {
  const router = useRouter();
  const { setState } = useCancelFlowStore();

  const handleClose = () => {
    router.push("/");
    setTimeout(() => {
      setState({
        choice: null,
        currentStep: 1,
        flowCompletedUnemployed: false,
        flowCompletedEmployed: false,
        subscriptionContinued: false,
      });
    }, 300);
  };

  return (
    <div className="w-full">
      <div className="relative flex md:justify-center border-b border-gray-200 px-4 py-3">
        <span className="text-sm font-medium text-gray-800">
          Subscription Continued
        </span>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-grid place-items-center h-8 w-8 rounded-md hover:bg-gray-100"
        >
          <CloseIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-10">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Great choice, mate!
          </h1>

          <p className="mt-3 text-xl md:text-2xl font-semibold leading-snug text-gray-900">
            You&apos;re still on the path to your dream role.{" "}
            <span className="text-[#826eff]">
              Let&apos;s make it happen together!
            </span>
          </p>

          <div className="mt-4 text-[13px] md:text-sm leading-6 text-gray-600">
            <p>You&apos;ve got XX days left on your current plan.</p>
            <p>Starting from XX date, your monthly payment will be $12.50.</p>
          </div>

          <p className="mt-2 text-[11px] md:text-[13px] text-gray-500 leading-relaxed italic">
            You can cancel anytime before then.
          </p>

          <hr className="my-5 border-gray-200" />

          <button
            onClick={handleClose}
            className="w-full md:w-auto rounded-xl bg-[#826eff] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#826eff]/40"
          >
            Land your dream role
          </button>
        </div>

        <div className="relative order-1 overflow-hidden rounded-lg md:order-2 h-52 md:h-auto">
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
  );
}
