import React, { ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface Answer {
  questionId: number;
  text: string;
  dateTime: string;
}

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

interface QuestionDetailsState {
  [key: number]: string;
}

interface QuestionAndDetailsListProps {
  questions: Question[];
  answers: Answer[];
  handleAddAnswer: (questionId: number, answerText: string) => void;
  newAnswers: QuestionDetailsState;
  handleAnswerChange: (
    questionId: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const QuestionAndDetailsList: React.FC<QuestionAndDetailsListProps> = ({
  questions,
  answers,
  handleAddAnswer,
  newAnswers,
  handleAnswerChange,
}) => {
  const renderAnswers = (questionId: number) => {
    const questionAnswers = answers.filter(
      (answer) => answer.questionId === questionId
    );
    return questionAnswers.map((answer, index) => (
      <div
        key={index}
        className="flex flex-col gap-4 p-6 rounded-lg bg-white cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FFAA00] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{" "}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">User {index + 1}</span>
            <span className="text-sm text-[#3C3C4399]">{answer.dateTime}</span>
          </div>
        </div>
        <p className="text-xl">{answer.text}</p>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-8">
        {questions.map((question, index) => (
          <li
            key={index}
            className="flex flex-col gap-4 p-6 rounded-lg bg-white cursor-pointer"
          >
            <h2 className="text-2xl text-[#3C3C4399]">{question.title}</h2>
            <p className="text-xl">{question.description}</p>
            <div className="flex gap-4 justify-between items-center">
              <div className="flex gap-4">
                {question.tags &&
                  Array.isArray(question.tags) &&
                  question.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm bg-[#EEF2FF] rounded-lg px-3 py-1 text-[#4F46E5]"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-4">{renderAnswers(question.id)}</div>

            <div className="mt-6">
              <textarea
                value={newAnswers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e)}
                className="w-full p-4 border rounded-lg"
                placeholder="Add your answer here..."
              />
              <button
                onClick={() =>
                  handleAddAnswer(question.id, newAnswers[question.id])
                }
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Answer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionAndDetailsList;
