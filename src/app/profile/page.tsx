import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const Profile = () => {
  return (
    <section className="flex flex-col items-center gap-12 mx-auto mt-20 max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold text-gray-800">Profile</h2>

      <Avatar className="cursor-pointer w-32 h-32 border-4 border-indigo-600">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Profile Picture"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-700">Eiden Goldman</h2>
        <a
          href="mailto:shawn_howard@gmail.com"
          className="text-xl text-indigo-500 hover:underline"
        >
          shawn_howard@gmail.com
        </a>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-600 mb-4 uppercase">
          Information
        </h3>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center border-b pb-4 text-2xl">
            <p className="text-gray-600">Score</p>
            <p className="font-medium text-gray-800">25</p>
          </div>
          <div className="flex justify-between items-center border-b pb-4 text-2xl">
            <p className="text-gray-600">Answered Questions</p>
            <p className=" font-medium text-gray-800">15</p>
          </div>
        </div>
      </div>

      <Button className="w-40 h-12 flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-lg shadow hover:bg-[#777E99]">
        <span className="text-xl">Logout</span>
        <LogOut />
      </Button>
    </section>
  );
};

export default Profile;
