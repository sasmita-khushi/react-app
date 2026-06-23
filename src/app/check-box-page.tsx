import CheckBox from "@/components/check-box";
import { useState } from "react";

export default function CheckBoxPage() {
  const [showCheck, setShowCheck] = useState(true);

  const handleShowClick = () => {
    setShowCheck((prev) => !prev);
  };
  return (
    <div className=" flex justify-center items-center mt-10">
      <CheckBox checked={showCheck} onChange={handleShowClick} />
    </div>
  );
}
