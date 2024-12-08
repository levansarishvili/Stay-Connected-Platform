import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface Leader {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  score: number;
  answered_questions: number;
}

export default async function RatingsSideBar() {
  const accessToken = cookies().get("accessToken")?.value;

  const url = process.env.NEXT_PUBLIC_DATA_API_URL;

  const response = await fetch(`${url}/api/users/leaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const leaderboards = await response.json();

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <h2 className="text-3xl font-semibold text-gray-800">Leaderboard</h2>
      <ul className="flex flex-col gap-6 justify-center items-center w-full">
        {leaderboards.map((leader: Leader, index: number) => (
          <li
            key={index}
            className=" w-full rounded-lg relative flex gap-6 items-center justify-between p-4"
          >
            <Avatar
              className={`${
                index === 0
                  ? "border-[#FFAA00]"
                  : index === 1
                  ? "border-[#B2B2B2]"
                  : index === 2
                  ? "border-[#363632]"
                  : "border"
              } cursor-pointer w-16 h-16 border-2`}
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
              className={`${
                index < 3 ? "bg-primary text-white" : "bg-white text-grey-800"
              } w-full rounded-lg  flex items-center gap-6 justify-between p-6 relative`}
            >
              <div className="flex flex-col">
                <p className="text-xl">{`${leader.first_name} ${
                  leader.last_name || "username"
                }`}</p>
                <p className="text-[#B7B3B3] text-xl">
                  {`@${leader.last_name || "username"}`}
                </p>
              </div>
              <p className="text-xl">Score: {leader.score}</p>
              {index < 3 && (
                <div
                  className={`${
                    index === 0
                      ? "bg-[#FFAA00]"
                      : index === 1
                      ? "bg-[#B2B2B2]"
                      : "bg-[#7B7C58]"
                  } w-10 h-10 rounded-[0.4rem] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rotate-45`}
                >
                  <span className="rotate-[-45deg] text-xl">{index + 1}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
