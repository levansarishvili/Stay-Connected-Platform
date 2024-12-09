"use client";

import React, { useState } from "react";
import type { Answer } from "./AnswerList";

interface AddAnswerProps {
  questionId: number;
  accessToken: string;
  setAnswerState: React.Dispatch<React.SetStateAction<Answer[]>>;
  setAuthorIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const AddAnswer: React.FC<AddAnswerProps> = ({
  questionId,
  accessToken,
  setAnswerState,
  setAuthorIds,
}) => {
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_DATA_API_URL;

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!accessToken) {
      setError("Access token is missing. Please log in.");
      return;
    }

    if (newAnswer.trim()) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${url}/api/questions/${questionId}/answers/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ answer: newAnswer }),
          }
        );

        if (response.ok) {
          setNewAnswer("");
        } else {
          setError("Failed to add answer. Please try again.");
        }
      } catch (error) {
        console.error("Error adding answer:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }

      // Fetch the updated answers after adding a new answer
      try {
        fetch(`${url}/api/questions/${questionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setAnswerState(data.answers);
            const authorIds = data.answers.map(
              (answer: Answer) => answer.author
            );
            const uniqueAuthorIds = authorIds.filter(
              (id: number, index: number) => authorIds.indexOf(id) === index
            );
            setAuthorIds(() => uniqueAuthorIds);
          });
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    }
  };

  return (
    <div className="mt-6">
      <textarea
        value={newAnswer}
        onChange={handleAnswerChange}
        className="w-full px-6 py-10 border rounded-lg text-xl"
        placeholder="Add your answer here..."
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
      {/* Display error message if any */}
      <button
        onClick={handleSubmit}
        className="text-xl mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#777E99] transition-all animation duration-300"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Answer"}
      </button>
    </div>
  );
};

export default AddAnswer;
