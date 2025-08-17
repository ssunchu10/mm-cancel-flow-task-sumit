"use client";

import Image from "next/image";
import { useCancelFlowStore } from "@/store/cancelFlowStore";
import { useState } from "react";

export default function InitialChoice() {
  const { state, setState } = useCancelFlowStore();
  const [loading, setLoading] = useState(false);

  const initializeCancellation = async (
    user_id: string,
    subscription_id: string,
    employment_status: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": state.csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify({ user_id, subscription_id, employment_status }),
      });
      const data = await res.json();
      setLoading(false);
      return data.cancellation;
    } catch (error) {
      setLoading(false);
      console.error("API error:", error);
      return null;
    }
  };

  const handleChoose = async (choice: "yes" | "no") => {
    const user_id = state.user?.id;
    const subscription_id = state.subscription?.id;
    const employment_status = choice === "yes" ? "employed" : "unemployed";

    if (!user_id || !subscription_id) {
      console.error("User ID or Subscription ID is missing.");
      return;
    }

    const cancellation = await initializeCancellation(
      user_id,
      subscription_id,
      employment_status
    );

    setState({
      downsell_variant: cancellation?.downsell_variant,
    });

    const nextStep =
      cancellation?.downsell_variant === "B" && choice === "no" && state.accepted_downsell ? 2 : 1;
    setState({
      choice,
      currentStep: nextStep,
      response: {
        employment_status: employment_status,
      },
    });
  };

  return (
    <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-3">
      <div className="flex flex-col order-2 md:order-1">
        <h2 className="text-[20px] md:text-[25px] leading-snug font-bold text-gray-900">
          Hey mate,
          <br />
          <span className="block">Quick one before you go.</span>
        </h2>

        <p className="mt-4 md:mt-6 text-[20px] md:text-[25px] font-bold md:font-semibold italic text-gray-900">
          Have you found a job yet?
        </p>

        <p className="mt-4 md:mt-6 text-sm text-black">
          Whatever your answer, we just want to help you take the next step.
          With visa support, or by hearing how we can do better.
        </p>

        <div className="mt-2 space-y-3">
          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => handleChoose("yes")}
            className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
          >
            Yes, I've found a job
          </button>
          <button
            onClick={() => handleChoose("no")}
            className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
          >
            Not yet - I'm still looking
          </button>
        </div>
      </div>

      <div className="relative h-50 md:h-auto rounded-lg overflow-hidden order-1 md:order-2">
        <Image
          src="/main.jpg"
          alt="City skyline"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
