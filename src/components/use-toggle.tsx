import { useState } from "react";

export default function useToggle(defaultValue: any) {
  const [Value, setValue] = useState(defaultValue);

  function toggleValue(value: any) {
    setValue((currentValue: any) =>
      typeof value === "boolean" ? value : !currentValue,
    );
  }
  return [Value, toggleValue];
}
