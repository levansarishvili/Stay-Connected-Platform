import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import { Search, CirclePlus } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="flex items-center justify-between max-w-[90rem] px-8 py-3 mx-auto">
        <Image
          src="./assets/logo.svg"
          alt="logo"
          width={70}
          height={70}
        ></Image>
        <div className="flex gap-4">
          <Input
            placeholder="Enter Search Text"
            className="max-w-96 w-full h-9 rounded-xl bg-white  border-none"
          />
          <Input
            placeholder="Choose Tag"
            className="max-w-36 h-9 rounded-xl bg-white"
          />
          {/* <Button className="h-9 w-9 rounded-xl bg-white text-3xl">
            {<Search />}
          </Button> */}
        </div>

        <Button className="h-9 w-30 rounded-xl bg-white text-sm">
          Add Question
        </Button>
        <Avatar className="cursor-pointer w-12 h-12 border-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
