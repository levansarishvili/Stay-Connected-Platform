import QuestionList from "../components/QuestionList";

export default function Home() {
  return (
    <main className="grid grid-cols-[2fr,1fr] gap-30 mx-auto mt-20 max-w-[136rem]">
      <QuestionList />
    </main>
  );
}
