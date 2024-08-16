import {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} from './flashcards';
import {
  mockAddDoc,
  mockGetDocs,
  mockUpdateDoc,
  mockDeleteDoc,
  mockDoc,
  mockQuery,
  mockWhere,
  mockGetDoc,
} from '../__mocks__/firebase';

jest.mock('../firebase', () => ({
  db: {},
  collection: jest.fn(() => 'flashcardsCollection'),
  addDoc: mockAddDoc,
  getDocs: mockGetDocs,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  doc: mockDoc,
  query: mockQuery,
  where: mockWhere,
  getDoc: mockGetDoc,
}));

describe('Flashcards Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createFlashcard should create a new flashcard', async () => {
    const userId = 'user123';
    const data = { question: 'What is 2+2?', answer: '4' };
    const mockDocRef = { id: 'flashcard123' };
    mockAddDoc.mockResolvedValue(mockDocRef);

    const result = await createFlashcard(userId, data);

    expect(mockAddDoc).toHaveBeenCalledWith('flashcardsCollection', {
      userId,
      ...data,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result).toEqual({ id: 'flashcard123', userId, ...data, createdAt: expect.any(Date), updatedAt: expect.any(Date) });
  });

  test('getFlashcards should return a list of flashcards', async () => {
    const userId = 'user123';
    const mockSnapshot = {
      docs: [
        { id: 'flashcard1', data: () => ({ question: 'What is 2+2?', answer: '4' }) },
        { id: 'flashcard2', data: () => ({ question: 'What is 3+3?', answer: '6' }) },
      ],
    };
    mockGetDocs.mockResolvedValue(mockSnapshot);

    const result = await getFlashcards(userId);

    expect(mockQuery).toHaveBeenCalledWith('flashcardsCollection', mockWhere('userId', '==', userId));
    expect(result).toEqual([
      { id: 'flashcard1', question: 'What is 2+2?', answer: '4' },
      { id: 'flashcard2', question: 'What is 3+3?', answer: '6' },
    ]);
  });

  test('updateFlashcard should update an existing flashcard', async () => {
    const flashcardId = 'flashcard123';
    const data = { question: 'What is 2+3?', answer: '5' };
    const mockUpdatedFlashcard = { id: flashcardId, ...data, updatedAt: new Date() };
    mockUpdateDoc.mockResolvedValue();
    mockGetDoc.mockResolvedValue({ data: () => mockUpdatedFlashcard });

    const result = await updateFlashcard(flashcardId, data);

    expect(mockDoc).toHaveBeenCalledWith({}, 'flashcards', flashcardId);
    expect(mockUpdateDoc).toHaveBeenCalledWith(mockDoc(), { ...data, updatedAt: expect.any(Date) });
    expect(result).toEqual(mockUpdatedFlashcard);
  });

  test('deleteFlashcard should delete an existing flashcard', async () => {
    const flashcardId = 'flashcard123';
    mockDeleteDoc.mockResolvedValue();

    const result = await deleteFlashcard(flashcardId);

    expect(mockDoc).toHaveBeenCalledWith({}, 'flashcards', flashcardId);
    expect(mockDeleteDoc).toHaveBeenCalledWith(mockDoc());
    expect(result).toEqual({ id: flashcardId, deleted: true });
  });
});