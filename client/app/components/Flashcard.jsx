"use client";
import React, { useState } from 'react';

function Flashcard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-64 h-32 perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of the flashcard */}
        <div
          className={`absolute w-full h-full bg-white text-black flex items-center justify-center p-4 rounded-lg shadow-lg backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-lg font-bold">{question}</span>
        </div>

        {/* Back of the flashcard */}
        <div
          className={`absolute w-full h-full bg-gray-200 text-black flex items-center justify-center p-4 rounded-lg shadow-lg rotate-y-180 backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-lg font-bold">{answer}</span>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
