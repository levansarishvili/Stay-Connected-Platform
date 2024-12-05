import QuestionList from "../../../components/QuestionList";
import RatingsSideBar from "../../../components/RatingsSideBar";

export default function Home() {
  return (
    <main className="grid grid-cols-[1fr] md:grid-cols-[2fr,1fr] gap-28 mx-auto mt-20 max-w-[136rem] px-12 md:px-16">
      <QuestionList />
      <RatingsSideBar />
    </main>
  );
}
