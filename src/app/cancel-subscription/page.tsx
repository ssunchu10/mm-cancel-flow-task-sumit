"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Choice = 'yes' | 'no' | null;

export default function CancelStartPage() {
    const router = useRouter();
    const [choice, setChoice] = useState<Choice>(null);

    const choose = (val: "yes" | "no") => {
        setChoice(val);
        if (val === "yes") {
            router.push("/cancel-subscription/yes");
        } else {
            router.push("/cancel-subscription/no");
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 backdrop-blur-sm p-4 flex items-center justify-center">
            {/* Card */}
            <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                {/* Top bar */}
                <div className="relative border-b border-gray-300 py-3 text-center text-sm text-gray-800 text-bold">
                    Subscription Cancellation
                    <button
                        aria-label="Close"
                        onClick={() => router.push("/")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 inline-grid place-items-center h-8 w-8"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" className="pointer-events-none">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-8">
                    <div className="flex flex-col order-2 md:order-1">
                        <h2 className="text-[20px] md:text-[25px] leading-snug font-semibold text-gray-900">
                            Hey mate,<br />
                            <span className="block">Quick one before you go.</span>
                        </h2>

                        <p className="mt-6 text-[20px] md:text-[25px] font-bold italic text-gray-900">
                            Have you found a job yet?
                        </p>

                        <p className="mt-6 text-sm text-gray-800">
                            Whatever your answer, we just want to help you take the next step.
                            With visa support, or by hearing how we can do better.
                        </p>



                        <div className="mt-2 space-y-3">
                            <hr className="my-6 border-gray-200" />

                            <button
                                onClick={() => choose("yes")}
                                className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                            >
                                Yes, I've found a job
                            </button>
                            <button
                                onClick={() => choose("no")}
                                className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                            >
                                Not yet -  I'm still looking
                            </button>
                        </div>
                    </div>

                    <div className="relative h-50 md:h-[360px] rounded-lg overflow-hidden order-1 md:order-2">
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
        </div>
    );
}
