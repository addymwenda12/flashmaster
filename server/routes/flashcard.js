const express = require('express');
const router = express.Router();
const flashcards = require('../controllers/flashcards.js');

router.post('/', async (req, res) => {
  try {
    // const userId = req.user.id;
    const newFlashcard = await flashcards.createFlashcard(req.body);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error creating flashcard: ', error);
    res.status(500).json({ error: 'Failed to create flashcard' });
  }
});

router.get('/', async (req, res) => {
  try {
    const flashcardsList = await flashcards.getFlashcards();
    res.status(200).json(flashcardsList);
  } catch (error) {
    console.error('Error getting flashcards: ', error);
    res.status(500).json({ error: 'Failed to get flashcards' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedFlashcard = await flashcards.updateFlashcard(req.params.id, req.body);
    if (!updatedFlashcard) {
      return res.status(404).json({ error: 'Flashcard not found or you do not have permission to update it' });
    }
    res.json(updatedFlashcard);
  } catch (error) {
    console.error('Error updating flashcard: ', error);
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFlashcard = await flashcards.deleteFlashcard(req.params.id);
    if (!deletedFlashcard) {
      return res.status(404).json({ error: 'Flashcard not found or you do not have permission to delete it' });
    }
    res.json(deletedFlashcard);
  } catch (error) {
    console.error('Error deleting flashcard: ', error);
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

module.exports = router;