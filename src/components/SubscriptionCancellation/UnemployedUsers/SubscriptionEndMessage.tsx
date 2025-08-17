"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function SubscriptionEndMessage() {
  const router = useRouter();
  const { state } = useCancelFlowStore();
  const endDate = state.subscriptionEndDate;
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-10">
      {/* Left text */}
      <div className="flex flex-col justify-center order-2 md:order-1">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
          Sorry to see you go, mate.
        </h1>

        <p className="mt-4 text-lg font-semibold text-black">
          Thanks for being with us, and you're always welcome back.
        </p>

        <p className="mt-3 text-sm text-black leading-relaxed">
          Your subscription is set to end on {endDate}. <br />
          You'll still have full access until then. No further charges after
          that.
        </p>

        <p className="mt-2 text-[11px] md:text-[13px] text-gray-500 leading-relaxed">
          Changed your mind?
          <span className="hidden md:inline">&nbsp;</span>
          <br className="block md:hidden" />
          You can reactivate anytime before your end date.
        </p>

        <hr className="my-3 border-gray-200 md:my-4" />

        <button
          onClick={() => {
            router.push("/");
            setTimeout(() => {
              useCancelFlowStore
                .getState()
                .setState({ flowCompletedUnemployed: false, choice: null, currentStep: 1 });
            }, 300);
          }}
          className="w-full md:w-auto rounded-xl bg-[#826eff] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#826eff]/40"
        >
          Back to Jobs
        </button>
      </div>

      <div className="relative h-52 md:h-auto rounded-lg overflow-hidden order-1 md:order-2">
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
