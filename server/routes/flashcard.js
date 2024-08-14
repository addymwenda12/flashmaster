import express from "express";
import flashcards from "../controllers/flashcards.js";
import flashcardController from '../controllers/flashcardController.js';
import progressController from '../controllers/progressController.js';
import statisticsController from '../controllers/statisticsController.js';
import flashcardSetController from "../controllers/flashcardSetController.js";

const router = express.Router();

/* CREATE ROUTES */
router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required in the request body" });
    }
    const newFlashcard = await flashcards.createFlashcard(userId, req.body);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error("Error creating flashcard: ", error);
    res.status(500).json({ error: "Failed to create flashcard" });
  }
});

// Route to create a flashcard within a set
router.post("/sets/:setId/flashcards", flashcardSetController.createFlashcardInSet);

/* READ ROUTES */
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required in the query parameters" });
    }
    const flashcardsList = await flashcards.getFlashcards(userId);
    res.status(200).json(flashcardsList);
  } catch (error) {
    console.error("Error getting flashcards: ", error);
    res.status(500).json({ error: "Failed to get flashcards" });
  }
});

// Route to get flashcard sets
router.get("/sets", flashcardController.getFlashcardSets);

// Route to get study progress
router.get("/progress", progressController.getStudyProgress);

// Route to get statistics
router.get("/statistics", statisticsController.getStatistics);

/* UPDATE ROUTES */
router.put("/:id", async (req, res) => {
  try {
    const updatedFlashcard = await flashcards.updateFlashcard(
      req.params.id,
      req.body
    );
    if (!updatedFlashcard) {
      return res
        .status(404)
        .json({
          error:
            "Flashcard not found or you do not have permission to update it",
        });
    }
    res.json(updatedFlashcard);
  } catch (error) {
    console.error("Error updating flashcard: ", error);
    res.status(500).json({ error: "Failed to update flashcard" });
  }
});

// Route to update a flashcard within a set
router.put("/sets/:setId/flashcards/:flashcardId", flashcardSetController.updateFlashcardInSet);


/* DELETE ROUTES */
router.delete("/:id", async (req, res) => {
  try {
    const deletedFlashcard = await flashcards.deleteFlashcard(req.params.id);
    if (!deletedFlashcard) {
      return res
        .status(404)
        .json({
          error:
            "Flashcard not found or you do not have permission to delete it",
        });
      }
    res.status(200).json(deletedFlashcard);
  } catch (error) {
    console.error("Error deleting flashcard: ", error);
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
});

// Route to delete a flashcard within a set
router.delete("/sets/:setId/flashcards/:flashcardId", flashcardSetController.deleteFlashcardInSet);

export default router;
