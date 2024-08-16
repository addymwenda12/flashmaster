"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Flashcard from '../../components/Flashcard';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default function FlashcardSetPage({ params }) {
  const { id } = params; // Get the dynamic id from the params
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/flashcards/${id}`);
        setFlashcards(response.data);
      } catch (error) {
        setError('Failed to fetch flashcards');
        console.error('Error fetching flashcards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (flashcards.length === 0) {
    return <div>No flashcards found for this set.</div>;
  }

  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Flashcard Set {id}</h1>
      <Flashcard flashcards={flashcards} />
    </div>
  );
}
