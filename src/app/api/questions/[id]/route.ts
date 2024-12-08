// app/api/questions/[id]/route.ts
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;

  const url = process.env.DATA_API_URL;

  // Fetch the question details
  const responseQuestion = await fetch(`${url}/api/questions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Fetch the answers for the question
  const responseAnswer = await fetch(`${url}/api/questions/${id}/answers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Handle errors
  if (!responseQuestion.ok) {
    return new Response("Question not found", { status: 404 });
  }

  if (!responseAnswer.ok) {
    return new Response("Answers not found", { status: 404 });
  }

  const question = await responseQuestion.json();
  const answers = await responseAnswer.json();

  return new Response(JSON.stringify({ question, answers }), {
    headers: { "Content-Type": "application/json" },
  });
}
