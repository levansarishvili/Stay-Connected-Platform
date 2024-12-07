"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TagsSelect from "../components/TagsSelect";
import { Button } from "../components/ui/button";

export default function Search() {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  // Handle title input change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Handle form submission and navigate
  const handleSearch = () => {
    const query = new URLSearchParams();
    if (tags.length) query.set("tags", tags.join(","));
    if (title) query.set("title", title);

    // Redirect using the router
    router.push(`/home/?${query.toString()}`);
  };

  // Reset search fields
  const resetSearch = () => {
    router.push("/home");
    setTitle("");
    setTags([]);
  };

  return (
    <div className="flex sm:flex-col mb-8 md:flex-row gap-6 items-center justify-between w-full bg-primary p-6 rounded-lg">
      {/* Title input */}
      <div className="flex gap-6 w-full">
        <input
          type="search"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Search Text"
          className="border w-full rounded-lg px-4 py-3 focus:outline-none text-xl text-primary"
        />
        {/* Multi-select for tags */}
        <div className="w-full">
          <TagsSelect onTagsChange={setTags} />
        </div>
      </div>

      <div className="flex gap-6">
        <Button
          onClick={handleSearch}
          className="min-w-28 h-12 py-3 bg-white text-primary rounded-lg hover:bg-[#777E99] hover:text-white text-xl"
        >
          Search
        </Button>
        {/* Reset button */}
        <Button
          onClick={resetSearch}
          className="min-w-28 h-12 py-3 bg-gray-300 text-primary rounded-lg hover:bg-gray-500 hover:text-white text-xl"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
