import api from "../apiService";

export const getFlashcardSets = async (userId) => {
  return api.get(`/flashcards/sets?userId=${userId}`);
};

export const getFlashcardSet = async (setId) => {
  return api.get(`/flashcards/sets/${setId}`);
};

export const createFlashcardSet = async (data) => {
  return api.post("/flashcards/sets", data);
};

export const searchFlashcardSets = async (userId, searchTerm, shared) => {
  return api.get(
    `/flashcards/search?userId=${userId}&searchTerm=${searchTerm}&shared=${shared}`
  );
};

export const shareFlashcardSet = async (data) => {
  return api.post("/flashcards/share", data);
};

export const getSharedFlashcardSets = async (userId) => {
  return api.get(`/flashcards/shared?userId=${userId}`);
};

export const createFlashcardInSet = async (setId, data) => {
  return api.post(`/flashcards/sets/${setId}/flashcards`, data);
};

export const updateFlashcardInSet = async (setId, flashcardId, data) => {
  return api.put(`/flashcards/sets/${setId}/flashcards/${flashcardId}`, data);
};

export const deleteFlashcardInSet = async (setId, flashcardId) => {
  return api.delete(`/flashcards/sets/${setId}/flashcards/${flashcardId}`);
};

export const createFlashcard = async (userId, data) => {
  return api.post("/flashcards", { userId, ...data });
};

export const getFlashcards = async (userId) => {
  return api.get(`/flashcards?userId=${userId}`);
};

export const updateFlashcard = async (flashcardId, data) => {
  return api.put(`/flashcards/${flashcardId}`, data);
};

export const deleteFlashcard = async (flashcardId) => {
  return api.delete(`/flashcards/${flashcardId}`);
};

export const submitAssessment = async (flashcardId, assessment) => {
  return api.post("/flashcards/study-session/assessment", {
    flashcardId,
    assessment,
  });
};

export const getStudyProgress = async () => {
  return api.get("/flashcards/progress");
};

export const getDailyStudyStreak = async () => {
  return api.get("/flashcards/daily-streak");
};

export const getStatistics = async () => {
  return api.get("/flashcards/statistics");
};

export const getFlashcardSetProgress = async (setId) => {
  return api.get(`/flashcards/sets/${setId}/progress`);
};

export const generateFlashcards = (prompt) => {
  return api.post("/gemini/generate-content", { prompt });
};

export const analyzeDocument = (file) => {
  const formData = new FormData();
  formData.append("document", file);
  return api.post("/languages/analyze-text", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};
