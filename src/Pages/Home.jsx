// Home.js

import React, { useState, useEffect } from "react";
import Filter from "../Components/Filter";
import Search from "../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, borrowBook } from "../store/bookslice";
import { fetchUser } from "../store/slice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../store/wishlistslice";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Pagination from "../Components/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { books, loading, error, totalPages, totalBooks } = useSelector(
    (state) => state.books
  );
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchBooks({ query: "", genre: "", page, limit }));
      dispatch(fetchWishlist());
    }
  }, [dispatch, page, limit, user]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleBorrowBook = (bookId) => {
    dispatch(borrowBook(bookId)); // Dispatch borrowBook action
  };

  if (userLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl capitalize">
          Hello, {user ? user.username : "Guest"}
        </h1>
        <p>Welcome to BooksApp</p>
      </div>

      {!user && (
        <div className="bg-yellow-200 text-yellow-700 p-3 rounded-lg my-4">
          <p>You need to login first to view books.</p>
          <Link to="/signin" className="text-blue-600 underline">
            Click here to Sign In
          </Link>
        </div>
      )}

      {user && (
        <>
          <div className="flex items-center justify-between">
            <Search />
            <Filter />
          </div>

          <div className="mt-5">
            {loading && <p>Loading books...</p>}
            {error && (
              <p className="bg-yellow-200 text-yellow-700">{error.message}</p>
            )}

            <table className="min-w-full border border-gray-800 text-sm shadow-md rounded overflow-hidden">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Genre</th>
                  <th className="py-2 px-4 text-left">Wishlist</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                  <th className="py-2 px-4 text-left">Action</th>
                 
                </tr>
              </thead>
              <tbody>
                {Array.isArray(books) &&
                  books.map((book) => (
                    <tr
                      key={book._id}
                      className="border-t gap-y-6 border-zinc-800"
                    >
                      <td className="py-3 px-4">{book.title}</td>
                      <td className="py-3 px-4">{book.author}</td>
                      <td className="py-3 px-4">{book.genre}</td>

                      <td className="py-3 px-4">
                        {wishlist.books.some((b) => b._id === book._id) ? (
                          <FaHeart
                            className="cursor-pointer text-red-500"
                            onClick={() =>
                              dispatch(removeFromWishlist(book._id))
                            }
                          />
                        ) : (
                          <FaRegHeart
                            className="cursor-pointer"
                            onClick={() => dispatch(addToWishlist(book._id))}
                          />
                        )}
                      </td>
                      <td className="py-3 px-4">{book.status}</td>
                      <td className="py-3 px-4">
                        {book.averageRating
                          ? book.averageRating.toFixed(1)
                          : "No ratings"}
                      </td>
                      {/* Borrow button */}
                      <td className="py-3 px-4">
                        {book.status === "available" ? (
                          <button
                            onClick={() => handleBorrowBook(book._id)}
                            className="p-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            Borrow
                          </button>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Borrowed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Pagination
             page={page}
             totalPages={totalPages}
             onPrev={handlePrevPage}
             onNext={handleNextPage}
            
            />
          </div>
        </>
      )}
    </div>
  );
}
