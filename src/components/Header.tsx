import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="flex gap-10 items-center justify-between max-w-[136rem] px-8 py-6 mx-auto">
        <Image
          src="./assets/logo.svg"
          alt="logo"
          width={50}
          height={50}
        ></Image>
        <div className="flex gap-6 w-[40rem] ">
          <input
            type="search"
            placeholder="Enter Search Text "
            className="w-2/3 rounded-lg px-4 py-3 border-none focus:outline-none text-xl text-primary"
          />
          <input
            type="search"
            placeholder="Choose Tag"
            className=" w-1/3 rounded-lg px-4 py-3 border-none focus:outline-none text-xl text-primary"
          />
        </div>

        <button className="flex items-center bg-white text-xl text-primary p-3 rounded-lg">
          Add Question
        </button>
        <Avatar className="cursor-pointer w-16 h-16 border-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
