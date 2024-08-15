import { db } from '../firebase.js';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import moment from 'moment';

const studySessionsCollection = collection(db, 'studySessions');

function calculateNextReviewDate(easinessFactor, interval, repetitions) {
  if (repetitions === 0) {
    return moment().add(1, 'days').toDate();
  } else if (repetitions === 1) {
    return moment().add(6, 'days').toDate();
  } else {
    return moment().add(interval * easinessFactor, 'days').toDate();
  }
}

async function updateFlashcardReview(flashcardId, assessment) {
  const flashcardRef = doc(db, 'flashcards', flashcardId);
  const flashcardDoc = await getDoc(flashcardRef);

  if (!flashcardDoc.exists()) {
    throw new Error('Flashcard not found');
  }

  const flashcard = flashcardDoc.data();
  let { easinessFactor, interval, repetitions } = flashcard;

  switch (assessment) {
    case 'Easy':
      easinessFactor = Math.max(1.3, easinessFactor + 0.1);
      repetitions += 1;
      interval = repetitions === 1 ? 6 : interval * easinessFactor;
      break;
    case 'Good':
      repetitions += 1;
      interval = repetitions === 1 ? 6 : interval * easinessFactor;
      break;
    case 'Hard':
      easinessFactor = Math.max(1.3, easinessFactor - 0.2);
      repetitions = 0;
      interval = 1;
      break;
    case 'Again':
      repetitions = 0;
      interval = 1;
      break;
    default:
      throw new Error('Invalid assessment');
  }

  const nextReviewDate = calculateNextReviewDate(easinessFactor, interval, repetitions);

  await updateDoc(flashcardRef, {
    easinessFactor,
    interval,
    repetitions,
    nextReviewDate,
  });

  return { easinessFactor, interval, repetitions, nextReviewDate };
}

export default {
  updateFlashcardReview,
};