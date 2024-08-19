"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import {
  getStudyProgress,
  getDailyStudyStreak,
  getStatistics,
} from "../services/flashcardService";

function JourneyPage() {
  const [progress, setProgress] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [statistics, setStatistics] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch study progress and daily streak
    const fetchProgressAndStreak = async () => {
      try {
        const [progressResponse, streakResponse] = await Promise.all([
          getStudyProgress(),
          getDailyStudyStreak(),
        ]);

        setProgress(progressResponse.data.progress);
        setDailyStreak(streakResponse.data.streak);
      } catch (error) {
        setError(error.message || "Failed to fetch progress or daily streak.");
      }
    };

    // Fetch study statistics
    const fetchStatistics = async () => {
      try {
        const response = await getStatistics();
        setStatistics(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch statistics.");
      }
    };

    fetchProgressAndStreak();
    fetchStatistics();
  }, []);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6 bg-slate-200">
        <h1 className="text-2xl font-bold mb-5">My Learning Journey</h1>

        {error && <div className="text-red-500">{error}</div>}

        {/* Study Progress */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Study Progress</h2>
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-600">
                {progress}%
              </span>
            </div>
            <div className="flex mt-2">
              <div
                className="relative flex-grow bg-blue-200 rounded-full"
                style={{ height: "8px" }}
              >
                <div
                  className="absolute bg-blue-600 rounded-full"
                  style={{ width: `${progress}%`, height: "8px" }}
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

        {/* Study Statistics */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-2">Study Statistics</h2>
          <p className="text-lg">
            Total Cards Reviewed: {statistics.totalCardsReviewed}
          </p>
          <p className="text-lg">
            Total Time Studied: {statistics.totalTimeStudied} mins
          </p>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
