import React from "react";
import Logout from "../../../components/Logout";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { cookies } from "next/headers";

async function Profile() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("UserId:", userId);
  console.log("accessToken:", accessToken);

  const response = await fetch(
    `http://ios-stg.stayconnected.digital/api/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const userData = await response.json();
  console.log(userData);

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

      <Logout />
    </section>
  );
}

export default Profile;
