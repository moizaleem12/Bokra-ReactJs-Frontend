import React from "react";
import { useSelector } from "react-redux";

export default function Wishlist() {
  const wishlistBooks = useSelector((state) => state.wishlist.books);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>

      {wishlistBooks.length === 0 ? (
        <p className="text-gray-500">No books in your wishlist.</p>
      ) : (
        <table className="min-w-full border border-gray-800 text-sm shadow-md rounded overflow-hidden">
          <thead className="bg-zinc-800">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Genre</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {wishlistBooks.map((book) => (
              <tr
                key={book._id}
                className="border-t gap-y-6 border-zinc-800"
              >
                <td className="py-3 px-4">{book.title}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4">{book.genre}</td>
                <td className="py-3 px-4">{book.status}</td>
                <td className="py-3 px-4">
                  {book.averageRating
                    ? book.averageRating.toFixed(1)
                    : "No ratings"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
