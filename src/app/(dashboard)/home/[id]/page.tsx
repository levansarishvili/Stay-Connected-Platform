import React from "react";
import { cookies } from "next/headers";
import AddAnswer from "../../../../components/AddAnswer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnswerList from "../../../../components/AnswerList";
import GetAnswersAuthor from "../../../../components/AnswersAuthor";

export interface Params {
  id: number;
  locale?: string;
}

interface authorDataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

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

export interface authorsDetailsType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("userId")?.value;
  const { id } = params;
  const url = process.env.NEXT_PUBLIC_DATA_API_URL;

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
  const questionAuthorId = question.author;

  // Get answers authors unique id and fetch author details
  const answersAuthorIds = question.answers.map(
    (answer: Answer) => answer.author
  );
  const uniqueAuthorIds: number[] = Array.from(new Set(answersAuthorIds));

  const authorsDetails: authorsDetailsType[] = await GetAnswersAuthor(
    uniqueAuthorIds
  );

  // Fetch question author details
  const responseAuthor = await fetch(
    `${url}/api/users/data/${questionAuthorId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!responseAuthor.ok) {
    return <div>Author not found</div>;
  }

  const authorData: authorDataType = await responseAuthor.json();

  return (
    <section className="flex flex-col gap-12 px-10 py-8 min-h-screen max-w-[96rem] mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Question Details</h2>
      <div className="flex flex-col gap-6 p-12 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col w-[15rem] gap-2 items-center">
            <Avatar className="cursor-pointer w-16 h-16 border ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xl font-medium text-gray-700 mt-2">
              {`${authorData.first_name} ${authorData.last_name}`}{" "}
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {question.title}
            </h2>
            <p className="text-2xl text-gray-700 mt-2">{question.question}</p>
          </div>
        </div>
      </div>

      <AnswerList
        answers={question.answers}
        accessToken={accessToken || ""}
        authorId={question.author}
        userId={userId}
        authorsDetails={authorsDetails}
      />

      <AddAnswer questionId={question.id} accessToken={accessToken || ""} />
    </section>
  );
};

export default QuestionDetails;
