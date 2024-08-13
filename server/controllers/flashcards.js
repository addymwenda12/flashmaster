import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

const flashcardsCollection = collection(db, "flashcards");

/* CREATE */
async function createFlashcard(userId, data) {
  if (!userId || !data) {
    throw new Error("Invalid input: userId and data are required");
  }

  try {
    const newFlashcard = {
      userId,
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

/* READ */
async function getFlashcards(userId) {
  if (!userId) {
    throw new Error("Invalid input: userId is required");
  }

  try {
    const q = query(flashcardsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting flashcards:", error);
    throw error;
  }
}

/* UPDATE */
async function updateFlashcard(flashcardId, data) {
  if (!flashcardId || !data) {
    throw new Error("Invalid input: flashcardId and data are required");
  }

  try {
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await updateDoc(flashcardRef, {
      ...data,
      updatedAt: new Date(),
    });
    const updatedFlashcard = await getDoc(flashcardRef);
    return { id: flashcardId, ...updatedFlashcard.data() };
  } catch (error) {
    console.error("Error updating flashcard:", error);
    throw error;
  }
}

/* DELETE */
async function deleteFlashcard(flashcardId) {
  if (!flashcardId) {
    throw new Error("Invalid input: flashcardId is required");
  }

  try {
    const flashcardRef = doc(db, "flashcards", flashcardId);
    await deleteDoc(flashcardRef);
    return { id: flashcardId, deleted: true };
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    throw error;
  }
}

export { createFlashcard, getFlashcards, updateFlashcard, deleteFlashcard };
