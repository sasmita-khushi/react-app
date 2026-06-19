import AutoComplete from "@/components/auto-complete";
import { useEffect, useState } from "react";

type MovieType = {
  id: number;
  title: string;
  year: string;
};
export default function AutoCompletePage() {
  const [movies, setMovies] = useState<MovieType[]>([]);

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
  });

  const handleMovie = (selectedMovie: MovieType) => {
    console.log("User selected:", selectedMovie);
    console.count("handleMovie called");
  };

  return (
    <div>
      <AutoComplete
        data={movies}
        placeholder="Search movies..."
        onChange={handleMovie}
        id="id"
        propsToBind="title"
      />
    </div>
  );
}
