"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_BASE_URL } from '../../config';

export default function EditFlashCardPage() {
  const router = useRouter();
  const { id } = router.query;
  const [flashcard, setFlashcard] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      const fetchFlashcard = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/flashcards/${id}`);
          const data = await response.json();

          if (response.ok) {
            setFlashcard(data);
            setQuestion(data.question);
            setAnswer(data.answer);
          } else {
            setError('Failed to fetch flashcard data.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred while fetching flashcard data.');
        }
      };

      fetchFlashcard();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    if (!question || !answer) {
      setError('All fields are required.');
      return;
    }

    // Clear any previous error
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}}/flashcards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Flashcard updated successfully!');
        router.push(`/flashcards/${id}`);
      } else {
        setError(result.error || 'Failed to update flashcard.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the flashcard.');
    }
  };

  if (!flashcard) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Flashcard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <input
            id="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Update Flashcard
        </button>
      </form>
    </div>
  );
}
