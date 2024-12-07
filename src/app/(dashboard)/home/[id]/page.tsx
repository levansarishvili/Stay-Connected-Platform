import React from "react";
import { cookies } from "next/headers";
import AddAnswer from "../../../../components/AddAnswer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;

  // Fetch question data
  const responseQuestion = await fetch(
    `https://ios-stg.stayconnected.digital/api/questions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Fetch answers data
  const responseAnswer = await fetch(
    `https://ios-stg.stayconnected.digital/api/questions/${id}/answers/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!responseQuestion.ok) {
    return <div>Question not found</div>;
  }

  if (!responseAnswer.ok) {
    return <div>Answers not found</div>;
  }

  const question = await responseQuestion.json();
  const answers = await responseAnswer.json();

  return (
    <section className="flex flex-col gap-12 px-10 py-8 bg-gray-100 min-h-screen">
      {/* Question Details */}
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-6">
          {/* Placeholder Avatar */}
          <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FFAA00] ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {question.title}
            </h1>
            <p className="text-lg text-gray-700 mt-2">{question.question}</p>
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
              <div key={index} className="p-8 rounded-xl bg-white shadow-lg">
                <p className="text-lg text-gray-800">{answer.text}</p>
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
      {/* Add Answer Form */}
      <AddAnswer questionId={question.id} accessToken={accessToken || ""} />
    </section>
  );
};

export default QuestionDetails;
