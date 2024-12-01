"use client";
import { useState } from "react";
import QuestionAndDetailsList from "../../components/QuestionListWithAnswers";
import RatingsSideBar from "../../components/RatingsSideBar";

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

interface Answer {
  questionId: number;
  text: string;
  dateTime: string;
}

interface QuestionDetailsState {
  [key: number]: string;
}

export default function QuestionDetails() {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      title: "Question 1",
      description: "Lorem ipsum dolor sit amet.",
      tags: ["Frontend", "React"],
    },
    {
      id: 2,
      title: "Question 2",
      description: "What is your opinion on SwiftUI?",
      tags: ["iOS", "SwiftUI"],
    },
  ]);

  const [answers, setAnswers] = useState<Answer[]>([
    {
      questionId: 1,
      text: "This is the first answer.",
      dateTime: "2024-12-01 10:00 AM",
    },
    {
      questionId: 2,
      text: "I prefer SwiftUI.",
      dateTime: "2024-12-01 11:30 AM",
    },
  ]);

  const [newAnswers, setNewAnswers] = useState<QuestionDetailsState>({});

  const handleAddAnswer = (questionId: number, answerText: string) => {
    if (answerText.trim()) {
      const newAnswerObject: Answer = {
        questionId,
        text: answerText,
        dateTime: new Date().toLocaleString(),
      };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswerObject]);
    }
  };

  const handleAnswerChange = (
    questionId: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewAnswers((prevState) => ({
      ...prevState,
      [questionId]: event.target.value,
    }));
  };

  return (
    <main className="grid grid-cols-[2fr,1fr] gap-28 mx-auto mt-20 max-w-[136rem]">
      <div className="space-y-8">
        <section className="pb-20">
          <h2 className="mb-10 text-2xl">Questions</h2>
          <QuestionAndDetailsList
            questions={questions}
            answers={answers}
            handleAddAnswer={handleAddAnswer}
            newAnswers={newAnswers}
            handleAnswerChange={handleAnswerChange}
          />
        </section>
        <div className="border-t-4 border-gray-300 dark:border-gray-700 h-5"></div>
      </div>
      <RatingsSideBar />
    </main>
  );
}
