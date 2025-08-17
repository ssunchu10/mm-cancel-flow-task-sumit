import React from "react";

interface EmailInfoProps {
  email: string;
}

const EmailInfo: React.FC<EmailInfoProps> = ({ email }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">Email</p>
    <p className="mt-1 text-md text-gray-900">{email || "N/A"}</p>
  </div>
);

export default EmailInfo;
