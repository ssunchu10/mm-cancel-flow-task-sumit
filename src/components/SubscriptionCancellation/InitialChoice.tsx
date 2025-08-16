"use client";

import Image from "next/image";

interface InitialChoiceProps {
    onChoose: (choice: "yes" | "no") => void;
}

export default function InitialChoice({ onChoose }: InitialChoiceProps) {
    return (
        <div className="grid gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-3">
            <div className="flex flex-col order-2 md:order-1">
                <h2 className="text-[20px] md:text-[25px] leading-snug font-bold text-gray-900">
                    Hey mate,<br />
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
                        onClick={() => onChoose("yes")}
                        className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                    >
                        Yes, I've found a job
                    </button>
                    <button
                        onClick={() => onChoose("no")}
                        className="w-full text-mid rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8952fc]/20 focus:border-[#8952fc]"
                    >
                        Not yet -  I'm still looking
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
