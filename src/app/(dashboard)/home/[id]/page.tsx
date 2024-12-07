"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = ({ params }: { params: Params }) => {
  const { id } = params;
  const [questionData, setQuestionData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(`/api/questions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        setError("Failed to load question details");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!questionData) {
    return <div>No question data found</div>;
  }

  return (
    <QuestionDetailsClient
      question={questionData.question}
      answers={questionData.answers}
    />
  );
};

export default QuestionDetails;

// Client Component
const QuestionDetailsClient = ({
  question,
  answers,
}: {
  question: any;
  answers: any[];
}) => {
  return (
    <section className="flex flex-col gap-12 px-10 py-8 bg-gray-100 min-h-screen">
      {/* Question Details */}
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20 border-4 border-[#FFAA00]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {question.title}
            </h1>
            <p className="text-lg text-gray-700 mt-2">{question.question}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {question.tags &&
                question.tags.map(
                  (tag: { name: string; color: string }, index: number) => (
                    <span
                      key={index}
                      className="text-base px-4 py-2 rounded-full text-white font-medium"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </span>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Answer Details */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Answers</h2>
          <span className="text-lg text-gray-600">
            {answers.length} {answers.length === 1 ? "answer" : "answers"}
          </span>
        </div>
        {answers.length > 0 ? (
          <div className="flex flex-col gap-6">
            {answers.map((answer: any, index: number) => (
              <AnswerDetailsClient key={index} answer={answer} index={index} />
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
    </section>
  );
};

// Answer Details Component
const AnswerDetailsClient = ({
  answer,
  index,
}: {
  answer: any;
  index: number;
}) => {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-xl bg-white shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-6">
        <Avatar className="w-16 h-16 border-3 border-[#FFAA00]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-900">
            User {index + 1}
          </span>
          <span className="text-base text-gray-600">
            {new Date(answer.dateTime).toLocaleString()}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-800 leading-relaxed">{answer.text}</p>
    </div>
  );
};
