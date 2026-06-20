import AutoComplete from "@/components/auto-complete";
import Button from "@/components/button";
import DropDown from "@/components/drop-down";
import { useEffect, useState } from "react";

type Student = {
  name: string;
  id: string;
};

type MovieType = {
  id: number;
  title: string;
  year: string;
};

type StudentMovie = {
  record_id: number;
  student_id: number;
  student_name: string;
  movie_id: number;
  movie_title: string;
};

export default function DropDownPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedMovies, setSelectedMovies] = useState<MovieType[]>([]);
  const [resetAuto, setResetAuto] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);
  const [showData, setShowData] = useState<StudentMovie[]>([]);

  // FETCH DATA FROM STUDENTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:3001/student");
        let data = await res.json();
        setStudents(data);
      } catch (err: any) {
        console.log("Error in fetching data", err);
      }
    };
    fetchData();
  }, []);

  // FETCH DATA FROM MOVIES
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:3001/movies");
        let data = await res.json();
        setMovies(data);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    fetchData();
  }, []);

  const fetchCombinations = async () => {
    try {
      let res = await fetch("http://localhost:3001/studentMovieCombination");
      let data = await res.json();
      setShowData(data);
    } catch (e) {
      console.log("Error in fetching data", e);
    }
  };

  useEffect(() => {
    fetchCombinations();
  }, []);

  const onStudentSelect = (student: Student) => {
    setSelectedStudent(student);
  };

  const onMovieSelect = (movie: MovieType) => {
    setSelectedMovies((prev) => {
      let alreadyExist = prev.some((m) => m.id === movie.id);
      if (alreadyExist) {
        return prev;
      }
      return [...prev, movie];
    });

    setResetAuto(true);
    setTimeout(() => {
      setResetAuto(false);
    }, 300);
  };

  //HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!selectedStudent || selectedMovies.length === 0) {
      alert("Please select a student and at least one movie.");
      return;
    }

    const payload = {
      studentId: selectedStudent.id,
      movieIds: selectedMovies.map((movie) => movie.id),
    };

    try {
      const res = await fetch("http://localhost:3001/studentChosenMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Successfully saved");
        fetchCombinations();
      } else {
        alert("Failed to save data " + data.error);
      }

      setSelectedStudent(null);
      setSelectedMovies([]);
      setResetDropdown(true);
      setTimeout(() => {
        setResetDropdown(false);
      }, 300);
    } catch (e: any) {
      alert("Error occurred :" + e.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mt-36 gap-4">
          <DropDown
            placeholder="Select Student Name"
            data={students}
            id="id"
            propsToBind={"name"}
            onSelect={onStudentSelect}
            reset={resetDropdown}
          />

          {selectedStudent && (
            <div>
              <AutoComplete
                propsToBind="title"
                id="id"
                data={movies}
                onChange={onMovieSelect}
                placeholder="Select movie"
                reset={resetAuto}
              />

              <h3 className="text-md font-bold underline mb-2">
                All Selected Movies:
              </h3>
              <ul className="flex flex-col gap-1">
                {selectedMovies.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 ">
          <Button text="Submit" variant="Filled" onClick={handleSubmit} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="max-h-80 overflow-y-auto border border-gray-300">
          <table className="border-collapse">
            <thead className="sticky top-0 bg-sky-50">
              <tr>
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Movie Title</th>
              </tr>
            </thead>

            <tbody>
              {showData.map((item) => (
                <tr key={item.record_id}>
                  <td className="border px-4 py-2">{item.student_name}</td>
                  <td className="border px-4 py-2">{item.movie_title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
