"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getFlashcardSets, deleteFlashcardInSet } from "../services/flashcardService";

function FlashcardSets() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcardSets();
  }, []);

  const fetchFlashcardSets = async () => {
    try {
      const response = await getFlashcardSets();
      setFlashcardSets(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch flashcard sets.");
    }
  };

  const handleDelete = async (setId) => {
    if (confirm("Are you sure you want to delete this flashcard set?")) {
      try {
        await deleteFlashcardInSet(setId);
        setFlashcardSets(flashcardSets.filter(set => set.id !== setId));
      } catch (error) {
        setError(error.message || "Failed to delete flashcard set.");
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcardSets.length === 0 ? (
        <p>No flashcard sets available.</p>
      ) : (
        flashcardSets.map((set) => (
          <div key={set.id} className="bg-white shadow-xl rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {set.title}
            </h2>
            <p className="text-gray-600 mb-4">Number of Cards: {set.cards}</p>
            <p className="text-gray-500 text-sm">
              Last Updated: {set.lastUpdated}
            </p>
            <div className="mt-4 flex justify-between">
              <Link
                href={`/flashcards/${set.id}`}
                className="text-blue-500 hover:underline"
              >
                Study Now
              </Link>
              <button
                onClick={() => handleDelete(set.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FlashcardSets;
