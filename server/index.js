import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
import flashcardRoutes from "./routes/flashcard.js";
// import vertexRoutes from "./routes/vertex.js";
import geminiRoutes from "./routes/gemini.js";
import languageRoutes from "./routes/language.js";
import subscriptionRoutes from "./routes/subscription.js";
import friendRoutes from "./routes/friend.js";

/* CONFIGURATION */
dotenv.config();

const app = express();

/* CORS CONFIGURATION */
const corsOptions = {
  origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001','https://flashmaster-frontend.vercel.app', 'https://flashmaster.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Get __dirname equivalent in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/out')));
// app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../client/out/index.html'));
// });

/* ROUTES */
app.use("/api/flashcards", flashcardRoutes);
// app.use("/api/vertex", vertexRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/gemini", geminiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));