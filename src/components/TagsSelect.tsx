"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";

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
  return (
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
          boxShadow: state.isFocused ? "none" : base.boxShadow,
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
  );
}
