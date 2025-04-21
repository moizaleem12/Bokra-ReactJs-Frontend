import React from 'react'

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
   <>
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="p-2 bg-zinc-800 hover:bg-amber-200 text-white rounded disabled:bg-gray-300 disabled:text-zinc-400"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600 mt-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="p-2 bg-zinc-800 hover:bg-amber-200 text-white rounded disabled:bg-gray-300 disabled:text-zinc-400"
      >
        Next
      </button>
    </div>
   </>
  )
}
