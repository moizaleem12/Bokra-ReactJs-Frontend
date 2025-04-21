import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function Popup({ rating, setRating, onClose, onSubmit }) {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-xl flex justify-center items-center z-50">
        <div className="bg-red-900 p-6 rounded shadow-md w-96 text-white">
          <h3 className="text-lg font-semibold mb-4">Rate this book before returning</h3>
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`text-2xl ${rating >= num ? "text-yellow-400" : "text-gray-400"}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-orange-600 rounded hover:bg-orange-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={rating === 0}
              className="px-4 py-2 bg-orange-500 text-white rounded disabled:bg-orange-300 hover:bg-orange-600 transition-colors"
            >
              Submit & Return
            </button>
          </div>
        </div>
      </div>
    </>
  )
}