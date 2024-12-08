import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="flex gap-10 items-center justify-between max-w-[136rem] px-8 py-6 mx-auto">
        <Link href={"/home"}>
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={50}
            height={50}
          ></Image>
        </Link>

        <h1 className="text-4xl font-bold text-white">Stay Connected</h1>

        <div className="flex items-center gap-8">
          <Link href="/create-question" className="flex items-center gap-4">
            <button className="hidden md:flex items-center bg-white text-xl text-primary py-3 px-6 font-medium hover:bg-[#777E99] hover:text-white transition-all animation duration-300 rounded-lg">
              Add Question
            </button>
            <CirclePlus stroke="white" className="md:hidden" size={24} />
          </Link>
          <Link href="/profile">
            <Avatar className="cursor-pointer w-16 h-16 border-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
