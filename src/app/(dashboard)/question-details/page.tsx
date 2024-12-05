"use client";
import { useState } from "react";
import QuestionAndDetailsList from "../../../components/QuestionListWithAnswers";
import RatingsSideBar from "../../../components/RatingsSideBar";

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
    <section className="grid grid-cols-[1fr] md:grid-cols-[2fr,1fr] gap-28 mx-auto mt-20 px-12 md:px-16 max-w-[136rem]">
      <section className="flex flex-col gap-8 items-center">
        <h2 className="text-3xl text-gray-800">Questions</h2>
        <QuestionAndDetailsList
          questions={questions}
          answers={answers}
          handleAddAnswer={handleAddAnswer}
          newAnswers={newAnswers}
          handleAnswerChange={handleAnswerChange}
        />
      </section>

      <RatingsSideBar />
    </section>
  );
}
