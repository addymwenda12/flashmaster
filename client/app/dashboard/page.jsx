import React, { useEffect, useState } from 'react';
import { Skeleton, Card, CardContent, Typography, Button, CardActions, Pagination } from '@mui/material';
import SideNav from '../components/SideNav';
import FlashcardForm from '../components/FlashcardForm';
import { getFlashcardSets, deleteFlashcardSet, getProgress, getDailyStreak } from '../services/flashcardService';

function DashBoardPage() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const flashcardsPerPage = 6;

  useEffect(() => {
    // Fetch flashcard sets from the API
    const fetchFlashcardSets = async () => {
      try {
        const response = await getFlashcardSets();
        setFlashcardSets(response.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch flashcard sets.');
      }
    };

    // Fetch study progress and daily streak
    const fetchProgressAndStreak = async () => {
      try {
        const [progressResponse, streakResponse] = await Promise.all([
          getProgress(),
          getDailyStreak(),
        ]);

        setProgress(progressResponse.data.progress);
        setDailyStreak(streakResponse.data.streak);
      } catch (error) {
        setError(error.message || 'Failed to fetch progress or daily streak.');
      }
    };

    fetchFlashcardSets();
    fetchProgressAndStreak();
  }, []);

  const handleDelete = async (setId) => {
    try {
      await deleteFlashcardSet(setId);
      setFlashcardSets(flashcardSets.filter((set) => set.id !== setId));
    } catch (error) {
      setError(error.message || 'Failed to delete flashcard set.');
    }
  };

  const handleFlashcardsGenerated = async (newFlashcards) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFlashcardSets([...flashcardSets, ...newFlashcards]);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastFlashcard = currentPage * flashcardsPerPage;
  const indexOfFirstFlashcard = indexOfLastFlashcard - flashcardsPerPage;
  const currentFlashcards = flashcardSets.slice(indexOfFirstFlashcard, indexOfLastFlashcard);

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        {error && <div className="text-red-500">{error}</div>}

        {/* Flashcard Form */}
        <FlashcardForm onFlashcardsGenerated={handleFlashcardsGenerated} />

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
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Card key={index} className="bg-white shadow-xl rounded-lg p-4">
                <CardContent>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="rectangular" height={118} />
                </CardContent>
              </Card>
            ))
          ) : currentFlashcards.length === 0 ? (
            <Typography>No flashcard sets available.</Typography>
          ) : (
            currentFlashcards.map((set) => (
              <Card key={set.id} className="bg-white shadow-xl rounded-lg p-4">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {set.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Number of Cards: {set.cards}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated: {set.lastUpdated}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`/flashcards/${set.id}`}>
                    View Details
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(set.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(flashcardSets.length / flashcardsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;