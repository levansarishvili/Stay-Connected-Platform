import Link from "next/link";
import { cookies } from "next/headers";
import Search from "../components/Search";

interface QuestionType {
  id: number;
  author: number;
  title: string;
  question: string;
  tags: { name: string; color: string }[];
  correct_answer: number | null;
}

interface TagType {
  name: string;
  color: string;
}

export default async function QuestionList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const url = process.env.NEXT_PUBLIC_DATA_API_URL;
  const searchQueryTags = searchParams.tags || "";
  const searchQueryTitle = searchParams.title || "";

  const response = await fetch(
    `${url}/api/questions/?tags=${searchQueryTags}&title=${searchQueryTitle}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const questionsData: QuestionType[] = await response.json();

  if (questionsData.length === 0) {
    return (
      <div className="flex flex-col gap-64 items-center">
        <Search />
        <h2 className="text-4xl font-semibold text-gray-800">
          No questions found 😞
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <Search />

      <ul className="flex flex-col gap-8 w-full">
        {questionsData.map((question) => (
          <SingleQuestion
            key={question.id}
            id={question.id}
            title={question.title}
            question={question.question}
            tags={question.tags}
            correct_answer={question.correct_answer}
          />
        ))}
      </ul>
    </div>
  );
}

export function SingleQuestion({
  id,
  title,
  question,
  tags,
}: {
  id: number;
  title: string;
  question: string;
  tags: { name: string; color: string }[];
  correct_answer: number | null;
}) {
  return (
    <Link href={`/home/${id}`}>
      <li className="flex flex-col items-start gap-8 p-12 rounded-lg bg-[#fff] cursor-pointer hover:shadow-md transition-shadow duration-300 ">
        <h2 className="text-2xl text-[#3C3C4399]">{title}</h2>
        <p className="text-xl">{question}</p>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full">
          <div className="flex flex-wrap gap-4 max-w-[60rem]">
            {tags.map((tag) => (
              <Tag key={tag.name} name={tag.name} color={tag.color} />
            ))}
          </div>
        </div>
      </li>
    </Link>
  );
}

// Tag component to handle name and color props
export function Tag({ name, color }: TagType) {
  return (
    <span
      className="flex text-xl items-center px-4 py-1 rounded-xl"
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  );
}
