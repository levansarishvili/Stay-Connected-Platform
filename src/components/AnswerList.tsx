"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { CheckCircle } from "lucide-react";

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
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, accessToken }) => {
  const [answerState, setAnswerState] = useState(answers);
  const newUrl = process.env.NEXT_PUBLIC_DATA_API_URL;

  const handleReaction = async (id: number, action: "like" | "dislike") => {
    const endpoint = `${newUrl}/api/answers/${id}/${action}/`;

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

      const data = await response.json();
      console.log(data);

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

  const handleAccept = async (id: number) => {
    const endpoint = `${newUrl}/api/answers/${id}/accept/`;

    try {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setAnswerState((prev) =>
          prev.map((answer) => {
            if (answer.id === id) {
              return { ...answer, accepted: true };
            }
            return answer;
          })
        );
      } else {
        console.error("Failed to accept answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error accepting answer:", error);
    }
  };

  const handleReject = async (id: number) => {
    const endpoint = `${newUrl}/api/answers/${id}/reject/`;

    try {
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setAnswerState((prev) =>
          prev.map((answer) => {
            if (answer.id === id) {
              return { ...answer, accepted: false };
            }
            return answer;
          })
        );
      } else {
        console.error("Failed to reject answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error rejecting answer:", error);
    }
  };

  return (
    <div>
      {answerState.length > 0 ? (
        <div className="flex flex-col gap-8 ml-16">
          {answerState.map((answer) => (
            <div key={answer.id} className="p-8 rounded-xl bg-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex w-[100%] justify-between">
                  <div className="flex items-center gap-5">
                    <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FFAA00] ">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-semibold text-gray-800">
                      {answer.author}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    {answer.accepted && (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    )}
                    {answer.accepted && (
                      <span className="text-green-500 font-bold text-md">
                        Accepted
                      </span>
                    )}
                    {!answer.accepted && (
                      <>
                        <button
                          onClick={() => handleAccept(answer.id)}
                          className="text-blue-500"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(answer.id)}
                          className="text-red-500"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
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
