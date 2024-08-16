"use client";
import React, { useState } from 'react';

function Flashcard({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current flashcard index
  const [isFlipped, setIsFlipped] = useState(false);  // Track the flip state

  // Handle case where flashcards might be empty
  if (flashcards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  const currentFlashcard = flashcards[currentIndex]; // Get the current flashcard
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Flip the card
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to the next flashcard
      setIsFlipped(false); // Reset flip state for new flashcard
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Go to the previous flashcard
      setIsFlipped(false); // Reset flip state for previous flashcard
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-96 h-96 perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of the flashcard */}
          <div
            className={`absolute w-full h-full bg-white text-black flex items-center justify-center p-4 rounded-lg shadow-xl backface-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-lg font-bold">{currentFlashcard.question}</span>
          </div>

          {/* Back of the flashcard */}
          <div
            className={`absolute w-full h-full bg-gray-200 text-black flex items-center justify-center p-4 rounded-lg shadow-xl rotate-y-180 backface-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-lg font-bold">{currentFlashcard.answer}</span>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4 w-full">
        {/* Show "Previous" button only if not the first card */}
        <button
          className={`px-4 py-2 bg-gray-400 rounded-lg text-white ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        {/* Show "Next" button only if not the last card */}
        <button
          className={`px-4 py-2 bg-blue-500 rounded-lg text-white ${currentIndex === flashcards.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
