import React from "react";

interface SubscriptionStatusProps {
  status: string;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ status }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-900">Subscription status</p>
    </div>
    <div className="flex items-center space-x-2">
      {status !== "cancelled" && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          Active
        </span>
      )}
      {status === "cancelled" && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200">
          Inactive
        </span>
      )}
    </div>
  </div>
);

export default SubscriptionStatus;
