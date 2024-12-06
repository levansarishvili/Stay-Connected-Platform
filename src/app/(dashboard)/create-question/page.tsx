"use client";

import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import TagsSelect from "../../../components/TagsSelect";

function CreateQuestionPage() {
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    tags_list: [],
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tags_list" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
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
      setResponseMessage("Question created successfully!");
      console.log(result);
    } catch (error) {
      console.error("Error:", error.message);
      setResponseMessage("Failed to create question. Please try again.");
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
          <TagsSelect />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-12 w-60 md:w-full md:max-w-md rounded-md text-xl md:text-2xl h-16 px-8 md:px-12 bg-[#4e53a2] hover:bg-[#777E99] text-white shadow-lg transition duration-300"
        >
          Create Question
        </Button>
      </form>

      {responseMessage && (
        <p className="text-lg text-center text-gray-700 mt-4">
          {responseMessage}
        </p>
      )}
    </section>
  );
}

export default CreateQuestionPage;
