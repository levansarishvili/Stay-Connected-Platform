import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import TagsSelect from "../../components/TagsSelect";

export default function CreateQuestionPage() {
  return (
    <section className="flex flex-col items-center justify-center max-w-5xl mx-auto mt-20 p-16 bg-white shadow-2xl rounded-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-12">
        Create a New Question
      </h1>

      <div className="flex flex-col gap-10 w-full">
        {/* Title */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="question-title"
            className="text-2xl font-medium text-gray-700"
          >
            Question Title
          </label>
          <Input
            id="question-title"
            placeholder="Enter the title of your question"
            className="rounded-md h-16 border border-gray-300 transition duration-300 p-4"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="question-description"
            className="text-2xl font-medium text-gray-700"
          >
            Question Description
          </label>
          <Textarea
            id="question-description"
            placeholder="Provide a detailed description of your question"
            className="min-h-[12rem] rounded-md border-gray-300  transition duration-300 p-4"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="tags-select"
            className="text-2xl font-medium text-gray-700"
          >
            Tags
          </label>
          <TagsSelect />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="mt-12 w-full max-w-md rounded-md text-2xl h-16 px-12 bg-[#4e53a2] hover:bg-[#777E99] text-white shadow-lg transition duration-300">
        Create Question
      </Button>
    </section>
  );
}
