"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Answer {
  id: number;
  author: number;
  accepted: boolean;
  answer: string;
  likes: number;
  dislikes: number;
  liked_by_user: boolean;
  disliked_by_user: boolean;
}

interface AnswerListProps {
  answers: Answer[];
  accessToken: string;
  url: string;
}

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  accessToken,
  url,
}) => {
  const [answerState, setAnswerState] = useState(answers);

  const handleReaction = async (id: number, action: "like" | "dislike") => {
    const endpoint = `${url}/api/answers/${id}/${action}/`;

    console.log(endpoint);

    try {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setAnswerState((prev) =>
          prev.map((answer) => {
            if (answer.id === id) {
              if (action === "like") {
                if (answer.liked_by_user) {
                  return {
                    ...answer,
                    likes: answer.likes - 1,
                    liked_by_user: false,
                  };
                } else {
                  return {
                    ...answer,
                    likes: answer.likes + 1,
                    dislikes: answer.disliked_by_user
                      ? answer.dislikes - 1
                      : answer.dislikes,
                    liked_by_user: true,
                    disliked_by_user: false,
                  };
                }
              } else if (action === "dislike") {
                if (answer.disliked_by_user) {
                  return {
                    ...answer,
                    dislikes: answer.dislikes - 1,
                    disliked_by_user: false,
                  };
                } else {
                  return {
                    ...answer,
                    dislikes: answer.dislikes + 1,
                    likes: answer.liked_by_user
                      ? answer.likes - 1
                      : answer.likes,
                    disliked_by_user: true,
                    liked_by_user: false,
                  };
                }
              }
            }
            return answer;
          })
        );
      } else {
        console.error("Failed to update reaction:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  return (
    <div>
      {answerState.length > 0 ? (
        <div className="flex flex-col gap-8 ml-16">
          {answerState.map((answer) => (
            <div key={answer.id} className="p-8 rounded-xl bg-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-5">
                  <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FFAA00] ">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold text-gray-800">
                    {answer.author}
                  </p>
                </div>
                {answer.accepted && (
                  <span className="text-green-500 font-bold text-sm">
                    Accepted
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-700">{answer.answer}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleReaction(answer.id, "like")}
                  className={`flex items-center gap-2 text-sm ${
                    answer.liked_by_user ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  <ThumbsUp className="w-6 h-6" /> {answer.likes}
                </button>
                <button
                  onClick={() => handleReaction(answer.id, "dislike")}
                  className={`flex items-center gap-2 text-sm ${
                    answer.disliked_by_user ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  <ThumbsDown className="w-6 h-6" /> {answer.dislikes}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 rounded-lg bg-gray-50 border border-gray-200 text-center shadow-sm">
          <p className="text-lg text-gray-600">
            There are no answers yet. Be the first to contribute!
          </p>
        </div>
      )}
    </div>
  );
};

export default AnswerList;
