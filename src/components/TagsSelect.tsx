"use client";

import { useEffect, useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface TagsSelectProps {
  onTagsChange: (selectedTags: string[]) => void;
}

export default function AnimatedMulti({ onTagsChange }: TagsSelectProps) {
  const [tags, setTags] = useState<
    { value: string; label: string; color: string }[]
  >([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags", {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error === "Unauthorized") {
            setIsLoggedIn(false);
            return;
          }
          console.error("Error fetching tags:", errorData);
          return;
        }

        const data = await response.json();

        setTags(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTags();
  }, []);

  if (!isLoggedIn) {
    return <p>Token is invalid</p>;
  }

  const handleChange = (
    selected: MultiValue<{ value: string; label: string; color: string }>,
    actionMeta: ActionMeta<{ value: string; label: string; color: string }>
  ) => {
    const selectedTags = selected.map((tag) => tag.value);
    onTagsChange(selectedTags); // Pass selected tags to parent
  };

  return (
    <Select
      instanceId={"tags-select"}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={tags}
      onChange={handleChange}
      styles={{
        control: (base, state) => ({
          ...base,
          borderRadius: "1rem",
          maxWidth: "100%",
          fontSize: "1.4rem",
          border: "1px solid #85858591",
          boxShadow: state.isFocused ? "black" : base.boxShadow,
        }),

        menu: (base) => ({
          ...base,
          borderRadius: "1rem",
          fontSize: "1.4rem",
        }),

        option: (base, state) => {
          const tagColor = tags.find((opt) => opt.value === base.value)?.color;
          return {
            ...base,
            borderRadius: "1rem",
            color: state.isSelected ? "#FFFFFF" : tagColor,
            backgroundColor: state.isSelected ? tagColor : "#FFFFFF",
            fontSize: "1.4rem",
          };
        },

        multiValue: (base) => ({
          ...base,
          borderRadius: "1rem",
          backgroundColor: "#000",
          fontSize: "1.4rem",
        }),

        multiValueLabel: (base, { data }) => ({
          ...base,
          color: data.color,
        }),

        multiValueRemove: (base) => ({
          ...base,
          color: "white",
          ":hover": {
            svg: {
              color: "red",
            },
          },
        }),
      }}
    />
  );
}
