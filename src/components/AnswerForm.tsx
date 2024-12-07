"use client";

import React, { useState } from "react";

interface AnswerFormProps {
  id: number;
  accessToken: string;
  initialAnswers: any[];
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  id,
  accessToken,
  initialAnswers,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>(initialAnswers);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    const response = await fetch(
      `https://ios-stg.stayconnected.digital/api/questions/${id}/answers/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ answer }),
      }
    );

    if (response.ok) {
      const newAnswer = await response.json();
      setAnswers([newAnswer, ...answers]); // Prepend the new answer to the existing list
      setAnswer(""); // Reset the textarea
      alert("Answer added successfully!");
    } else {
      alert("Failed to add answer");
    }
  };

  return (
    <div className="mt-6">
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        className="w-full p-4 border rounded-lg"
        placeholder="Add your answer here..."
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Answer
      </button>

      {/* Render existing answers */}
      <div className="flex flex-col gap-6 mt-6">
        {answers.map((answer: any, index: number) => (
          <div key={index} className="p-8 rounded-xl bg-white shadow-lg">
            <p className="text-lg text-gray-800">{answer.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerForm;
