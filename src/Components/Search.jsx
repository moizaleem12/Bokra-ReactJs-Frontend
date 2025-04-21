import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../store/bookslice";

export default function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  
    dispatch(
      fetchBooks({
        query: value,
        genre: "",      // or your selected genre
        page: 1,        // reset to page 1 when searching
        limit: 6,       // or whatever your default limit is
      })
    );
  };


  return (
    <div className="flex items-center space-x-2 rounded-lg p-2 border border-zinc-900">
      <CiSearch />
      <input
        className="border-none outline-none"
        type="search"
        placeholder="Search your books here"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}
