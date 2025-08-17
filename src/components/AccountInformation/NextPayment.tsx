import React from "react";

interface NextPaymentProps {
  updatedAt: string;
  status: string;
}

const NextPayment: React.FC<NextPaymentProps> = ({ updatedAt, status }) => {
  let nextPayment = "N/A";
  if (updatedAt) {
    const nextPaymentDate = new Date(updatedAt);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    nextPayment = nextPaymentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-2">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        {status === "cancelled" ? <p className="text-sm font-medium text-gray-900">Subscription valid until </p> : <p className="text-sm font-medium text-gray-900">Next Payment</p>}
      </div>
      <p className="text-sm font-medium text-gray-900">{nextPayment}</p>
    </div>
  );
};

export default NextPayment;
