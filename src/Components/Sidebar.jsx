import React, { useState } from "react";
import { PiBooks } from "react-icons/pi";
import { SiPivotaltracker } from "react-icons/si";
import { FaShoppingBag, FaBars, FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slice";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative flex">
      {!isOpen && (
        <button
          className="absolute top-4 left-4 z-50 bg-zinc-200 p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      )}

      <div
        className={`h-screen bg-[#242424] py-8 px-3 rounded-2xl transition-all duration-300 ease-in-out 
        ${isOpen ? "w-64" : "w-20"} overflow-hidden relative`}
      >
        {isOpen && (
          <button
            className="absolute top-4 right-4 z-10 bg-zinc-200 p-2 rounded-full shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <FaChevronLeft />
          </button>
        )}

        <h1
          className={`text-2xl mb-5 font-bold text-white transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Bokra
        </h1>

        <div className="flex flex-col gap-4 text-white">
          <Link
            to="/"
            className="flex items-center gap-x-3 hover:bg-zinc-200 hover:text-black rounded-lg px-3 py-2"
          >
            <PiBooks size={24} />
            {isOpen && <span>Books</span>}
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-x-3 hover:bg-zinc-200 hover:text-black rounded-lg px-3 py-2"
          >
            <SiPivotaltracker size={24} />
            {isOpen && <span>Wishlist</span>}
          </Link>
          <Link
            to="/track"
            className="flex items-center gap-x-3 hover:bg-zinc-200 hover:text-black rounded-lg px-3 py-2"
          >
            <FaShoppingBag size={24} />
            {isOpen && <span>Track</span>}
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-x-3 hover:bg-zinc-200 hover:text-black mt-10 rounded-lg px-3 py-2 text-white w-full"
        >
          <FaShoppingBag size={24} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
