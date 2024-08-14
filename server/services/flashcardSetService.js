import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const flashcardsCollection = collection(db, "flashcards");

/* CREATE */
async function createFlashcardSet(data) {
  if (!data) {
    throw new Error("Invalid input: data is required");
  }

  try {
    const newFlashcardSet = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "flashcardSets"), newFlashcardSet);
    return { id: docRef.id, ...newFlashcardSet };
  } catch (error) {
    console.error("Error creating flashcard set:", error);
    throw error;
  }
}

async function createFlashcardInSet(setId, data) {
  if (!setId || !data) {
    throw new Error("Invalid input: setId and data are required");
  }

  try {
    const newFlashcard = {
      setId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(flashcardsCollection, newFlashcard);
    return { id: docRef.id, ...newFlashcard };
  } catch (error) {
    console.error("Error creating flashcard:", error);
    throw error;
  }
}

/* UPDATE */
async function updateFlashcardInSet(setId, flashcardId, data) {
  if (!setId || !flashcardId || !data) {
    throw new Error("Invalid input: setId, flashcardId, and data are required");
  }

  try {
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await updateDoc(flashcardRef, {
      ...data,
      updatedAt: new Date(),
    });
    const updatedFlashcard = await getDoc(flashcardRef);
    return { id: updatedFlashcard.id, ...updatedFlashcard.data() };
  } catch (error) {
    console.error("Error updating flashcard:", error);
    throw error;
  }
}

/* DELETE */
async function deleteFlashcardInSet(setId, flashcardId) {
  if (!setId || !flashcardId) {
    throw new Error("Invalid input: setId and flashcardId are required");
  }

  try {
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await deleteDoc(flashcardRef);
    return { id: flashcardId };
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    throw error;
  }
}

export default {
  createFlashcardSet,
  createFlashcardInSet,
  updateFlashcardInSet,
  deleteFlashcardInSet,
};
