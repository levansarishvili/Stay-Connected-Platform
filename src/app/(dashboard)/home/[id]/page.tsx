// import NotFoundPage from "../../../not-found";
import ReturnBackButton from "../../../../components/ReturnBackBtn";
import { cookies } from "next/headers";
// import { Params } from "../../../../interfaces/params";
// import "../../../../../index.css";

export interface Params {
  id: number;
  locale?: string;
}

const QuestionDetails = async ({ params }: { params: Params }) => {
  const cookieStore = cookies();
  const userId = cookieStore.get("id")?.value;
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
    // return <NotFoundPage />;
  }

  const product = await response.json();

  if (!product || !product.id) {
    // return <NotFoundPage />;
  }
  return (
    <section className="products-section product">
      <h1>{product.author} Product</h1>
      <div key={product.title} className="products">
        <div className="product-list">
          <div className="image-container">
            <img src={product.tags} alt="" className="product-img" />
          </div>
          <div className="product-info">
            <h2 className="text-blue-800 font-bold text-2xl">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold italic">Brand: {product.brand}</p>
            <p className="font-semibold">Category: {product.category}</p>
            <p className="price">Price: ${product.price}</p>
          </div>
        </div>
        <div className="return-back">
          <ReturnBackButton />
        </div>
      </div>
    </section>
  );
};
export default QuestionDetails;
