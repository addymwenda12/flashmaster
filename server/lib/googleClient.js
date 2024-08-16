import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { LanguageServiceClient } from '@google-cloud/language';
import dotenv from 'dotenv';

dotenv.config();

const vertexClient = new PredictionServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS_LANGUAGE,
});

const languageClient = new LanguageServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS_VERTEXAI,
});

export { vertexClient, languageClient };