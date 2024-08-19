"use client";
import React, { useState } from 'react';
import { createFlashcard } from '../services/flashcardService';

export default function NewFlashCardForm() {
  const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    if (!userId || !question || !answer) {
      setError('All fields are required.');
      return;
    }

    // Clear any previous error
    setError('');

    try {
      const response = await createFlashcard(userId, { question, answer });

      if (response.status === 201) {
        setSuccess('Flashcard created successfully!');
        setUserId('');
        setQuestion('');
        setAnswer('');
      } else {
        setError(response.data.error || 'Failed to create flashcard.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the flashcard.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-14">
      <h2 className="text-2xl font-bold mb-4">Create New Flashcard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
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
          className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Create Flashcard
        </button>
      </form>
    </div>
  );
}
