"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SideNav from "../components/SideNav";
import { API_BASE_URL } from "../config";

function DailyChallengePage() {
  const [challengeSet, setChallengeSet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flashcard sets from the API
    const fetchFlashcardSets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/flashcards/sets`);
        const sets = response.data;

        if (sets.length > 0) {
          // Select a random set for the daily challenge
          const randomIndex = Math.floor(Math.random() * sets.length);
          setChallengeSet(sets[randomIndex]);
        } else {
          setError("No flashcard sets available for the challenge.");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch flashcard sets.");
      }
    };

    fetchFlashcardSets();
  }, []);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6 bg-slate-200">
        <h1 className="text-2xl font-bold mb-5">Daily Challenge</h1>

        {error && <div className="text-red-500">{error}</div>}

        {challengeSet ? (
          <div className="bg-white shadow-xl rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{challengeSet.title}</h2>
            <p className="text-gray-600 mb-4">Number of Cards: {challengeSet.cards}</p>
            <p className="text-gray-500 text-sm">Last Updated: {new Date(challengeSet.lastUpdated).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DailyChallengePage;
