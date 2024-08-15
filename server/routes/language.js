import express from 'express';
import { analyzeText } from '../controllers/googleLanguageController.js';

const router = express.Router();

router.post('/analyze-text', analyzeText);

export default router;