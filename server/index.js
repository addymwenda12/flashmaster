import express from "express";
import dotenv from "dotenv";
import flashcardRoutes from "./routes/flashcard.js";

dotenv.config();

const app = express();
app.use(express.json());

/* ROUTES */
app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
