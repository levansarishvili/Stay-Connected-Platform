import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function RatingsSideBar() {
  return (
    <div>
      <ul className="flex flex-col gap-6 justify-center items-center">
        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FFAA00] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-primary w-full rounded-lg  flex items-center justify-between p-6 relative">
            <div className="flex flex-col">
              <p className="text-white text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-white text-xl">Score: 2430</p>
            <div className="bg-[#FFAA00] w-10 h-10 rounded-[0.4rem] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rotate-45">
              <span className="rotate-[-45deg] text-xl">1</span>
            </div>
          </div>
        </li>

        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#B2B2B2] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-primary w-full rounded-lg relative flex items-center justify-between p-6">
            <div className="flex flex-col">
              <p className="text-white text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-white text-xl">Score: 2430</p>
            <div className="bg-[#B2B2B2] w-10 h-10 rounded-[0.4rem] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rotate-45">
              <span className="rotate-[-45deg] text-xl">2</span>
            </div>
          </div>
        </li>

        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#7B7C58] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-primary w-full rounded-lg relative flex items-center justify-between p-6">
            <div className="flex flex-col">
              <p className="text-white text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-white text-xl">Score: 2430</p>
            <div className="bg-[#7B7C58] w-10 h-10 rounded-[0.4rem] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rotate-45">
              <span className="rotate-[-45deg] text-xl">3</span>
            </div>
          </div>
        </li>

        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-white w-full rounded-lg relative flex items-center justify-between p-6">
            <div className="flex flex-col">
              <p className="text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-xl">Score: 2430</p>
          </div>
        </li>

        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-white w-full rounded-lg relative flex items-center justify-between p-6">
            <div className="flex flex-col">
              <p className="text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-xl">Score: 2430</p>
          </div>
        </li>

        <li className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="bg-white w-full rounded-lg relative flex items-center justify-between p-6">
            <div className="flex flex-col">
              <p className="text-xl">Eiden Goldman</p>
              <p className="text-[#B7B3B3] text-xl">@username</p>
            </div>
            <p className="text-xl">Score: 2430</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
