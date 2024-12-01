import AnswerList from "@/components/AnswersList";
import QuestionList from "../../components/QuestionList";
import RatingsSideBar from "../../components/RatingsSideBar";

export default function QuetionDetails() {
  return (
    <main className="grid grid-cols-[2fr,1fr] gap-28 mx-auto mt-20 max-w-[136rem]">
      <div className="space-y-8">
        <section className="pb-20">
          <h2 className="mb-10 text-2xl">Questions</h2>
          <QuestionList />
        </section>
        <div className="border-t-4 border-gray-300 dark:border-gray-700 h-5"></div>
        <section>
          <h2 className="mb-10 text-2xl">Answers</h2>
          <AnswerList />
        </section>
      </div>

      <RatingsSideBar />
    </main>
  );
}
