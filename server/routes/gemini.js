import express from 'express';
import { generateContentController } from '../controllers/googleVertexController.js';

const router = express.Router();

router.post('/generate-content', generateContentController);

export default router;
