"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { useState, useEffect } from "react";

const animatedComponents = makeAnimated();

const options = [
  { value: "Frontend", label: "Frontend" },
  { value: "iOS", label: "iOS" },
  { value: "SwiftUI", label: "SwiftUI" },
  { value: "API", label: "API" },
  { value: "UIKit", label: "UIKit" },
  { value: "Backend", label: "Backend" },
  { value: "Database", label: "Database" },
];

export default function AnimatedMulti() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://ios-stg.stayconnected.digital/api/tags/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        const formattedOptions = data.map((tag) => ({
          value: tag.name,
          label: tag.name,
          color: tag.color,
        }));
        setOptions(formattedOptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);
  return (
    <>
      <CreatableSelect
        isMulti
        options={options}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "1rem",
            fontSize: "1.4rem",
            border: "1px solid #85858591",
            boxShadow: state.isFocused ? "black" : base.boxShadow,
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "1rem",
            fontSize: "1.4rem",
          }),
          option: (base) => ({
            ...base,
            borderRadius: "1rem",
            color: "#4F46E5",
            fontSize: "1.4rem",
          }),
          multiValue: (base) => ({
            ...base,
            borderRadius: "1rem",
            backgroundColor: "#EEF2FF",
            color: "#4F46E5",
            fontSize: "1.4rem",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#4F46E5",
          }),
          multiValueRemove: (base) => ({
            ...base,
            ":hover": {
              svg: {
                color: "red",
              },
            },
          }),
        }}
      />
      <Select
        instanceId={"tags-select"}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[
          options[0],
          options[1],
          options[2],
          options[3],
          options[4],
        ]}
        isMulti
        options={options}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "1rem",
            fontSize: "1.4rem",
            border: "1px solid #85858591",
            boxShadow: state.isFocused ? "black" : base.boxShadow,
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "1rem",
            fontSize: "1.4rem",
          }),
          option: (base) => ({
            ...base,
            borderRadius: "1rem",
            color: "#4F46E5",
            fontSize: "1.4rem",
          }),
          multiValue: (base) => ({
            ...base,
            borderRadius: "1rem",
            backgroundColor: "#EEF2FF",
            color: "#4F46E5",
            fontSize: "1.4rem",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#4F46E5",
          }),
          multiValueRemove: (base) => ({
            ...base,
            ":hover": {
              svg: {
                color: "red",
              },
            },
          }),
        }}
      />
    </>
  );
}
