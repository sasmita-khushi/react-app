import AutoComplete from "@/components/auto-complete";

export default function AutoCompletePage() {
  const movies = [
    "Singham",
    "Avatar",
    "Batman",
    "Jawan",
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
  ];

  // const handleMovie = useMemo(
  //   () =>
  //     debounce((selectedMovie: string | null) => {
  //       console.log("User selected:", selectedMovie);
  //       console.count("handleMovie called");
  //     }, 400),
  //   [],
  // );

  const handleMovie = (selectedMovie: string | null) => {
    console.log("User selected:", selectedMovie);
    console.count("handleMovie called");
  };

  return (
    <div>
      <AutoComplete
        data={movies}
        placeholder="Search movies..."
        onChange={handleMovie}
      />
    </div>
  );
}
