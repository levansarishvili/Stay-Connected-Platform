import { cookies } from "next/headers";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;
  console.log(id, accessToken);

  // Fetch question details
  const responseQuestion = await fetch(
    `http://ios-stg.stayconnected.digital/api/questions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Fetch answer details
  const responseAnswer = await fetch(
    `http://ios-stg.stayconnected.digital/api/questions/${id}/answers/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!responseQuestion.ok || !responseAnswer.ok) {
    // Handle error if needed, e.g., display a "not found" page.
    return <div>Question not found</div>;
  }

  const question = await responseQuestion.json();
  const answers = await responseAnswer.json();
  console.log(question, answers);

  if (!question || !question.id) {
    // Handle error if no data is returned.
    return <div>Question not found</div>;
  }

  return <section className="products-section product">Details page</section>;
};

export default QuestionDetails;
