import { cookies } from "next/headers";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  console.log(params);
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;
  console.log(id, accessToken);

  const response = await fetch(
    `http://ios-stg.stayconnected.digital/api/questions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    // Handle error if needed, e.g., display a "not found" page.
    return <div>Question not found</div>;
  }

  const question = await response.json();
  console.log(question);

  if (!question || !question.id) {
    // Handle error if no data is returned.
    return <div>Question not found</div>;
  }

  return (
    <section className="products-section product">
      <h1 className="text-4xl font-semibold text-gray-800">
        Question Details page
      </h1>
    </section>
  );
};

export default QuestionDetails;
