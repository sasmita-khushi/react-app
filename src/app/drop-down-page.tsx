import DropDown from "@/components/drop-down";
import { useState } from "react";

type Student = {
  name: string;
  rollNo: number;
};
const students: Student[] = [
  { name: "Manas", rollNo: 1 },
  { name: "Khushi", rollNo: 2 },
  { name: "Misty", rollNo: 3 },
];

export default function DropDownPage() {
  const [selectedAge, setSelectedAge] = useState<{
    id: number;
    age: string;
  } | null>(null);

  const [showDropDown, setShowDropDown] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  // const [showForm, setShowForm] = useState(false);

  const onAgeSelect = (value: any) => {
    setSelectedAge(value);
    // setShowForm(false);
  };

  const onStudentSelect = (value: any) => {
    setSelectedStudent(value);
    //setShowForm(false);
  };
  const handleResetButton = () => {
    setSelectedAge(null);
    setSelectedStudent(null);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div>
      <div className=" flex justify-center items-center mt-36">
        <button onClick={toggleDropDown}>
          {showDropDown ? "hide" : "show"}
        </button>
        {showDropDown && (
          <DropDown
            placeholder="Select Your Age"
            data={[
              { age: "twenty", id: 1 },
              { age: "ten", id: 2 },
            ]}
            id={"id"}
            propsToBind={"age"}
            onSelect={onAgeSelect}
            value={selectedAge ?? undefined}
          />
        )}

        <h2>Selected Age: {selectedAge?.age}</h2>
        <div>
          <button
            className=" bg-blue-500 border border-gray-400 p-2 rounded-md w-20"
            onClick={handleResetButton}
          >
            Reset
          </button>
        </div>

        <DropDown
          placeholder="Select Student Name"
          data={students}
          id={"rollNo"}
          propsToBind={"name"}
          onSelect={onStudentSelect}
          value={selectedStudent ?? undefined}
        />
        <h2>SelectedStudent:{selectedStudent?.name}</h2>
      </div>
      <div className="bg-blue-100">
        {selectedAge && selectedStudent && (
          <h2>
            You selected: {selectedStudent?.name} - {selectedAge?.age}
          </h2>
        )}
      </div>
    </div>
  );
}
