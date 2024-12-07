import Link from "next/link";
import { cookies } from "next/headers";

interface QuestionType {
  id: number;
  author: number; // Correct type: number (not string)
  title: string;
  question: string;
  tags: { name: string; color: string }[]; // Correct type for tags
  correct_answer: number | null; // Correct type for correct_answer
}

interface TagType {
  name: string;
  color: string;
}

export default async function QuestionList() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const url = process.env.DATA_API_URL;

  const response = await fetch(`${url}/api/questions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const questionsData: QuestionType[] = await response.json();
  console.log(questionsData);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-semibold text-gray-800">Questions</h1>
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
  correct_answer,
}: {
  id: number;
  title: string;
  question: string;
  tags: { name: string; color: string }[];
  correct_answer: number | null;
}) {
  return (
    <Link href={`/home/${id}`}>
      <li className="flex flex-col items-start gap-8 p-6 rounded-lg bg-[#fff] cursor-pointer hover:shadow-md transition-shadow duration-300 ">
        <h2 className="text-2xl text-[#3C3C4399]">{title}</h2>
        <p className="text-xl">{question}</p>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full">
          <div className="flex flex-wrap gap-4 max-w-[60rem]">
            {tags.map((tag) => (
              <Tag key={tag.name} name={tag.name} color={tag.color} />
            ))}
          </div>
          <div className="flex">
            <span className="text-xl">
              {`Answers: ${correct_answer === null ? 0 : correct_answer}`}
            </span>
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
