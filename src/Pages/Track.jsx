// Track.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowedBooks, returnBook, rateBook,setBorrowedPage } from "../store/bookslice";
// import {  } from "../store/bookslice";
import Pagination from "../Components/Pagination";
import Popup from '../Components/Popup'
const Track = () => {
  const dispatch = useDispatch();
  const { 
    borrowedBooks, 
    loading, 
    error,
    totalBorrowedPages,
    currentBorrowedPage
  } = useSelector((state) => state.books);

  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchBorrowedBooks({ page: currentBorrowedPage, limit: 5 }));
  }, [dispatch, currentBorrowedPage]);

  const openRatingModal = (bookId) => {
    setSelectedBookId(bookId);
    setRating(0);
    setShowModal(true);
  };

  const handleReturn = async () => {
    if (rating > 0 && selectedBookId) {
      dispatch(rateBook({ bookId: selectedBookId, rating }));
    }
    dispatch(returnBook(selectedBookId));
    setShowModal(false);
  };

  const handlePrevPage = () => {
    if (currentBorrowedPage > 1) {
      dispatch(setBorrowedPage(currentBorrowedPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentBorrowedPage < totalBorrowedPages) {
      dispatch(setBorrowedPage(currentBorrowedPage + 1));
    }
  };

  return (
    <div className="flex flex-col px-4 py-6">
      <div className="flex flex-col space-y-3 mb-5">
        <h2 className="text-2xl font-semibold">Your Borrowed Books</h2>
        <p className="text-zinc-300">Track and manage your borrowed books here.</p>
      </div>

      {loading ? (
        <p>Loading borrowed books...</p>
      ) : error ? (
        <p className="bg-orange-600 text-zinc-200 p-3 rounded">{error}</p>
      ) : borrowedBooks.length === 0 ? (
        <p className="text-gray-700">You haven't borrowed any books yet.</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-800 text-sm shadow-md rounded overflow-hidden">
            <thead className="bg-zinc-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book._id} className="border-t border-zinc-800">
                  <td className="py-3 px-4">{book.title}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openRatingModal(book._id)}
                      className="p-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={currentBorrowedPage}
            totalPages={totalBorrowedPages}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />

          {/* Modal for Rating */}
          {showModal && (
           
            <Popup
            rating={rating}
            setRating={setRating}
            onClose={() => setShowModal(false)}
            onSubmit={handleReturn}
        />
          )}
        </>
      )}
    </div>
  );
};

export default Track;