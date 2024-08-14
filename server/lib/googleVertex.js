import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

dotenv.config();

const location = 'us-central1';
const vertexAI = new VertexAI({
  location: location,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS_VERTEXAI,
});

const generativeModel = vertexAI.generativeModel();

export default generativeModel;