import { cookies } from "next/headers";

interface QuestionType {
  id: number;
  author: string;
  title: string;
  question: string;
  tags: { name: string; color: string }[] | string[];
  correct_answer: string | null;
}

interface TagType {
  name: string;
  color: string;
}

export default async function QuestionList() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `http://ios-stg.stayconnected.digital/api/questions/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const questionsData: QuestionType[] = (await response.json()).results;
  console.log(questionsData);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-semibold text-gray-800">Questions</h1>
      <ul className="flex flex-col gap-8 w-full">
        {questionsData.map((question) => (
          <SingleQuestion
            key={question.id}
            title={question.title}
            question={question.question}
            tags={question.tags}
          />
        ))}
      </ul>
    </div>
  );
}

export function SingleQuestion({
  title,
  question,
  tags,
}: {
  title: string;
  question: string;
  tags: { name: string; color: string }[] | string[];
}) {
  return (
    <li className="flex flex-col items-start gap-8 p-6 rounded-lg bg-[#fff] cursor-pointer">
      <h2 className="text-2xl text-[#3C3C4399]">{title}</h2>
      <p className="text-xl">{question}</p>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full">
        <div className="flex flex-wrap gap-4 max-w-[60rem]">
          {/* Render tags here using the Tag component */}
          {Array.isArray(tags) &&
            tags.map((tag, index) => (
              <Tag
                key={index}
                name={typeof tag === "object" ? tag.name : tag}
                color={typeof tag === "object" ? tag.color : "#fff"}
              />
            ))}
        </div>
        <div className="flex gap-6">
          <span className="text-xl">Answer 1</span>
          <span className="text-[#3C3C4399] text-xl">Date Time</span>
        </div>
      </div>
    </li>
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
