"use client";
import React, { useState, useEffect } from 'react';
import { getFlashcards, submitAssessment } from '../services/flashcardService';

function Flashcard({ setId }) {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const response = await getFlashcards(setId);
        setFlashcards(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setError("Failed to load flashcards. Please try again.");
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, [setId]);

  if (loading) return <p>Loading flashcards...</p>;
  if (error) return <p>{error}</p>;
  if (flashcards.length === 0) return <p>No flashcards available.</p>;

  const currentFlashcard = flashcards[currentIndex];
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleAssessment = async (assessment) => {
    try {
      await submitAssessment(currentFlashcard.id, assessment);
      handleNext();
    } catch (error) {
      console.error("Error submitting assessment:", error);
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
          <div
            className={`absolute w-full h-full bg-white text-black flex items-center justify-center p-4 rounded-lg shadow-xl backface-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-lg font-bold">{currentFlashcard.question}</span>
          </div>

          <div
            className={`absolute w-full h-full bg-gray-200 text-black flex items-center justify-center p-4 rounded-lg shadow-xl rotate-y-180 backface-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-lg font-bold">{currentFlashcard.answer}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 w-full">
        <button
          className={`px-4 py-2 bg-gray-400 rounded-lg text-white ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button
          className={`px-4 py-2 bg-blue-500 rounded-lg text-white ${currentIndex === flashcards.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <button onClick={() => handleAssessment('easy')} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">Easy</button>
        <button onClick={() => handleAssessment('medium')} className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded">Medium</button>
        <button onClick={() => handleAssessment('hard')} className="px-4 py-2 bg-red-500 text-white rounded">Hard</button>
      </div>
    </div>
  );
}

export default Flashcard;
