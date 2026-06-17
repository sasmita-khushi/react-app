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

  return (
    <div>
      <AutoComplete
        data={movies}
        placeholder="Search movies..."
        onChange={(selectedMovie) =>
          console.log("User selected:", selectedMovie)
        }
      />
    </div>
  );
}
