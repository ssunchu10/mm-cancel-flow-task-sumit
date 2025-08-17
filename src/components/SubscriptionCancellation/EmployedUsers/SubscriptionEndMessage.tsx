"use client";

import Image from "next/image";
import MainImage from "../MainImage";
import { useRouter } from "next/navigation";
import { useCancelFlowStore } from "@/store/cancelFlowStore";

export default function EmployedEndMessage() {
  const router = useRouter();
  const { state } = useCancelFlowStore();
  const hasLawyer = state.response?.hasLawyer as "yes" | "no" | null;

  const handleFinish = () => {
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

  if (hasLawyer === "yes") {
    return (
      <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-8">
        <div className="relative h-52 md:h-auto rounded-lg overflow-hidden order-1 md:order-2">
          <Image
            src="/main.jpg"
            alt="City skyline"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center text-left order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            All done, your cancellation's been processed.
          </h2>
          <p className="mb-4 font-semibold text-gray-700">
            We're stoked to hear you've landed a job and sorted your visa. Big
            congrats from the team. 🙌
          </p>
          <button
            onClick={handleFinish}
            className="mt-2 px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-8">
      <div className="flex flex-col justify-center text-left">
        <h2 className="text-xl md:text-2xl font-semibold leading-tight mb-4 text-black">
          Your cancellation's all sorted, mate, no more charges.
        </h2>

        <div className="mb-4 rounded-xl bg-gray-100 border border-gray-200 p-4 shadow-sm">
          <div className="hidden md:flex items-start gap-4">
            <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden">
              <Image
                src="/mihailo.jpg"
                alt="Mihailo Bozic"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>

            <div className="flex-1 text-sm text-gray-800">
              <p className="font-semibold leading-tight text-black">
                Mihailo Bozic
              </p>
              <p className="text-gray-600">&lt;mihailo@migratemate.co&gt;</p>

              <div className="mt-3 space-y-2 text-gray-700">
                <p className="font-medium">
                  I'll be reaching out soon to help with the visa side of
                  things.
                </p>
                <p>
                  We've got your back, whether it's questions, paperwork, or
                  just figuring out your options.
                </p>
                <p>
                  Keep an eye on your inbox, I'll be in touch{" "}
                  <a href="#" className="underline underline-offset-2">
                    shortly
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/mihailo.jpg"
                  alt="Mihailo Bozic"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-tight text-black">
                  Mihailo Bozic
                </p>
                <p className="text-xs text-gray-600">
                  &lt;mihailo@migratemate.co&gt;
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-800 space-y-2 text-gray-700">
              <p className="font-medium">
                I'll be reaching out soon to help with the visa side of things.
              </p>
              <p>
                We've got your back, whether it's questions, paperwork, or just
                figuring out your options.
              </p>
              <p className="text-black">
                Keep an eye on your inbox, I'll be in touch{" "}
                <a href="#" className="underline underline-offset-2">
                  shortly
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />

        <button
          onClick={handleFinish}
          className="mt-2 px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
        >
          Finish
        </button>
      </div>

      <MainImage />
    </div>
  );
}
