"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import SideNav from "../components/SideNav";
import { API_BASE_URL } from "../config";

function DashBoardPage() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flashcard sets from the API
    const fetchFlashcardSets = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/sets`);
        setFlashcardSets(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch flashcard sets.");
      }
    };

    // Fetch study progress and daily streak
    const fetchProgressAndStreak = async () => {
      try {
        const [progressResponse, streakResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/progress`),
          axios.get(`${API_BASE_URL}/daily-streak`)
        ]);

        setProgress(progressResponse.data.progress);
        setDailyStreak(streakResponse.data.streak); 
      } catch (error) {
        setError(error.message || "Failed to fetch progress or daily streak.");
      }
    };

    fetchFlashcardSets();
    fetchProgressAndStreak();
  }, []);

  const handleDelete = async (setId) => {
    try {
      await axios.delete(`${API_BASE_URL}/sets/${setId}`);
      setFlashcardSets(flashcardSets.filter(set => set.id !== setId));
    } catch (error) {
      setError(error.message || "Failed to delete flashcard set.");
    }
  };

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        {error && <div className="text-red-500">{error}</div>}
        
        {/* Progress Bar */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Study Progress</h2>
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-600">{progress}%</span>
            </div>
            <div className="flex mt-2">
              <div
                className="relative flex-grow bg-blue-200 rounded-full"
                style={{ height: '8px' }}
              >
                <div
                  className="absolute bg-blue-600 rounded-full"
                  style={{ width: `${progress}%`, height: '8px' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Daily Study Streak</h2>
          <p className="text-lg font-bold">{dailyStreak} days</p>
        </div>

        {/* Flashcard Sets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <a
                    href={`/flashcards/${set.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </a>
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
      </div>
    </div>
  );
}

export default DashBoardPage;
