"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonComponent({
  buttonText,
  activeBtn,
  href,
}: {
  buttonText: string;
  activeBtn: boolean;
  href: string;
}) {
  return (
    <Button
      type="submit"
      className={`w-[100%] ${activeBtn ? "bg-button text-white" : "bg-transparent text-gray-600 shadow-transparent"} py-8 rounded-md hover:bg-[#777E99] hover:text-white focus:outline-none focus:ring-2 focus:bg-[#4F46E5] font-bold mx-auto text-[18px]`}
    >
      {/* <Link href={href} className="inline-block w-full max-w-[250px]"> */}
      {buttonText}
      {/* </Link> */}
    </Button>
  );
}
