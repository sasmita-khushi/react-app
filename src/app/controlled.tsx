import { useState } from "react";
export default function Controlled() {
  let [name, setName] = useState("manas");
  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="enter your name"
        onChange={handleChange}
        defaultValue={name}
      />

      <h2>Your name is :{name}</h2>
    </div>
  );
}
