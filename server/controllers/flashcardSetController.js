import flashcardsetService from "../services/flashcardsetService.js";

/* CREATE */
async function createFlashcardSet(req, res) {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing data" });
    }
    const newFlashcardSet = await flashcardsetService.createFlashcardSet(data);
    res.status(201).json(newFlashcardSet);
  } catch (error) {
    console.error("Error creating flashcard set:", error);
    res.status(500).json({ error: "Failed to create flashcard set" });
  }
}

async function createFlashcardInSet(req, res) {
  try {
    const { setId } = req.params.setId;
    const data = req.body;
    if (!setId || !data) {
      return res.status(400).json({ error: "Missing setId or data" });
    }
    const newFlashcard = await flashcardsetService.createFlashcardInSet(setId, data);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error("Error creating flashcard:", error);
    res.status(500).json({ error: "Failed to create flashcard in set"});
  }
}

/* UPDATE */
async function updateFlashcardInSet(req, res) {
  try {
    const setId = req.params.setId;
    const flashcardId = req.params.flashcardId;
    const data = req.body;
    if (!setId || !flashcardId || !data) {
      return res.status(400).json({ error: "Missing setId, flashcardId, or data" });
    }
    const updatedFlashcard = await flashcardsetService.updateFlashcardInSet(setId, flashcardId, data);
    res.status(200).json(updatedFlashcard);
  } catch (error) {
    console.error("Error updating flashcard in set:", error);
    res.status(500).json({ error: "Failed to update flashcard in set"});
  }
}

/* DELETE */
async function deleteFlashcardInSet(req, res) {
  try {
    const setId = req.params.setId;
    const flashcardId = req.params.flashcardId;
    if (!setId || !flashcardId) {
      return res.status(400).json({ error: "Missing setId or flashcardId" });
    }
    const deletedFlashcard = await flashcardsetService.deleteFlashcardInSet(setId, flashcardId);
    res.status(200).json(deletedFlashcard);
  } catch (error) {
    console.error("Error deleting flashcard in set:", error);
    res.status(500).json({ error: "Failed to delete flashcard in set"});
  }
}

export default {
  createFlashcardSet,
  createFlashcardInSet,
  updateFlashcardInSet,
  deleteFlashcardInSet,
};