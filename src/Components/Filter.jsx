import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../store/bookslice";

const genres = [
  "All",
  "Fiction",
  "Self-help",
  "Finance",
  "Dystopian",
  "Classic",
  "History",
  "Business",
  "Fantasy",
];

export default function Filter() {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    dispatch(fetchBooks({ genre: selectedGenre === "All" ? "" : selectedGenre }));
  }, [selectedGenre, dispatch]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="flex items-center p-2">
      <select
        className="w-full p-2 border border-zinc-900 rounded-md"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
