import { cookies } from "next/headers";
import ReturnBackButton from "../../../../components/ReturnBackBtn";
import Image from "next/image";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const { id } = params;

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

  if (!question || !question.id) {
    // Handle error if no data is returned.
    return <div>Question not found</div>;
  }

  return (
    <section className="products-section product">
      <h1>{question.author} Question</h1>
      <div key={question.title} className="products">
        <div className="product-list">
          <div className="image-container">
            <Image
              src={question.tags[0]?.color || ""}
              alt="tag"
              className="product-img"
            />
          </div>
          <div className="product-info">
            <h2 className="text-blue-800 font-bold text-2xl">
              {question.title}
            </h2>
            <p>{question.question}</p>
            <div className="tags">
              {question.tags.map((tag: { name: string; color: string }) => (
                <span
                  key={tag.name}
                  className="px-4 py-1 rounded-lg"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ReturnBackButton />
      </div>
    </section>
  );
};

export default QuestionDetails;
