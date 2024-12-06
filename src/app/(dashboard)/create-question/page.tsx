"use client";

import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import TagsSelect from "../../../components/TagsSelect";
import Error from "next/error";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  question: string;
  tags_list: string[];
}

function CreateQuestionPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    question: "",
    tags_list: [],
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tags_list" ? value.split(",") : value,
    }));
  };

  const handleTagsChange = (selectedTags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags_list: selectedTags,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Payload:", JSON.stringify(formData));

      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        throw new Error(errorResponse?.error || "Failed to create question");
      }

      const result = await response.json();
      toast({
        title: "Congratulations",
        description: "Question created successfully",
      });

      router.push("/home");

      console.log(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error);
      } else {
        console.error("An unknown error occurred");
      }
      toast({
        title: "Error",
        description: "Failed to create question. Please try again.",
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl mx-auto mt-20 p-12 md:p-16 bg-white shadow-2xl rounded-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-12">
        Create a New Question
      </h1>

      <form className="flex flex-col gap-10 w-full" onSubmit={handleSubmit}>
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
            name="title"
            placeholder="Enter the title of your question"
            value={formData.title}
            onChange={handleChange}
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
            name="question"
            placeholder="Provide a detailed description of your question"
            value={formData.question}
            onChange={handleChange}
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
          <TagsSelect onTagsChange={handleTagsChange} />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-12 mx-auto w-90 md:w-full md:max-w-md rounded-md text-xl md:text-2xl h-16 px-8 md:px-12 hover:bg-[#777E99] text-white shadow-lg transition duration-300"
        >
          Create Question
        </Button>
      </form>
    </section>
  );
}

export default CreateQuestionPage;
