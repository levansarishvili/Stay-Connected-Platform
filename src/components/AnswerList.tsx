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
  authorId: number;
  userId: string | undefined;
  answers: Answer[];
  accessToken: string;
}

const AnswerList: React.FC<AnswerListProps> = ({
  authorId,
  userId,
  answers,
  accessToken,
}) => {
  const [answerState, setAnswerState] = useState(answers);
  const [error, setError] = useState<string | null>(null);
  const newUrl = process.env.NEXT_PUBLIC_DATA_API_URL;

  //  Check if user is author of question
  const isAuthor = Number(authorId) === Number(userId);

  // Function to handle reaction
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

  // Function to handle accepting an answer
  const handleAccept = async (id: number) => {
    const endpoint = `${newUrl}/api/answers/${id}/accept/`;

    // Check if any answer is already accepted
    const isAccepted = answerState.some((answer) => answer.accepted);

    if (isAccepted) {
      setError(
        () =>
          "Only one answer can be accepted at a time, please reject the current accepted answer first."
      );
      return;
    }

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

  // Function to handle rejecting an answer
  const handleReject = async (id: number) => {
    const endpoint = `${newUrl}/api/answers/${id}/reject/`;
    setError(() => null);

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
          <p className="text-red-500 text-2xl">{error}</p>
          {answerState.map((answer) => (
            <div
              key={answer.id}
              className="p-8 rounded-xl bg-white shadow-lg  overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-12">
                {/* Author */}
                <div className="flex flex-col items-center gap-2 w-[15rem] md:w-auto">
                  <Avatar className="cursor-pointer w-16 h-16 border-2 border-gray-200 rounded-full overflow-hidden">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold text-gray-800">
                    {answer.author}
                  </p>
                </div>

                <div className="flex w-full justify-center">
                  <p className="text-xl text-center text-gray-700">
                    {answer.answer}
                  </p>
                </div>
              </div>

              {/* Reactions and actions */}
              <div className="flex justify-between gap-4 md:gap-10 mt-4">
                <div className="flex gap-4">
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

                {isAuthor && (
                  <div className="flex gap-4 items-center">
                    {answer.accepted && (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    )}
                    {answer.accepted ? (
                      <>
                        <span className="text-green-500 text-xl font-bold">
                          Accepted
                        </span>
                        <button
                          onClick={() => handleReject(answer.id)}
                          className="text-red-500 text-xl hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(answer.id)}
                          className="text-blue-500 text-xl hover:underline"
                        >
                          Accept
                        </button>
                        <span className="text-red-500 text-xl">Rejected</span>
                      </>
                    )}
                  </div>
                )}
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
