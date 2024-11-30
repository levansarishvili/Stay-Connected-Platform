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
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[options[0], options[1]]}
      isMulti
      options={options}
    />
  );
}
