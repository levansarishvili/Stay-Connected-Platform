"use client";

import { Button } from "@/components/ui/button";

export default function ButtonComponent({
  type,
  buttonText,
  activeBtn,
  onClick,
}: {
  type: "button" | "submit";
  buttonText: string;
  activeBtn: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`w-[100%] ${
        activeBtn
          ? "bg-button text-white"
          : "bg-transparent text-gray-600 shadow-transparent"
      } py-8 rounded-md hover:bg-[#777E99] hover:text-white focus:outline-none focus:ring-2 focus:bg-[#4F46E5] font-bold mx-auto text-[18px]`}
    >
      {buttonText}
    </Button>
  );
}
