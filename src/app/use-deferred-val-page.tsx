import BigList from "@/components/use-deferred-val";
import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />

      <BigList input={text} />
    </div>
  );
}
