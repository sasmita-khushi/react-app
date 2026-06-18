import { useCallback } from "react";
import useDebounce from "../components/debounce";

export default function a() {
  const handleKeyDown = useCallback(
    useDebounce((e: any) => {
      console.log(e.target.value);
    }, 300),
    [],
  );
  return (
    <div>
      <input
        type="text"
        placeholder="write your name"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
