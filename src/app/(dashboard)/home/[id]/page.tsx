// QuestionDetails.tsx
import React from "react";
import { cookies } from "next/headers";
import AddAnswer from "../../../../components/AddAnswer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnswerList from "../../../../components/AnswerList";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;
  const url = process.env.DATA_API_URL;

  const responseQuestion = await fetch(`${url}/api/questions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!responseQuestion.ok) {
    return <div>Question not found</div>;
  }

  const question = await responseQuestion.json();

  return (
    <section className="flex flex-col gap-12 px-10 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Question</h2>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-6">
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

      <AnswerList answers={question.answers} />

      <AddAnswer questionId={question.id} accessToken={accessToken || ""} />
    </section>
  );
};

export default QuestionDetails;
