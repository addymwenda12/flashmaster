import React, { useState } from 'react';
import { TextField, Button, IconButton, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { generateFlashcards, analyzeDocument } from '@/app/services/flashcardService';

function FlashcardForm({ onFlashcardsGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (file) {
        response = await analyzeDocument(file);
      } else if (prompt) {
        response = await generateFlashcards(prompt);
      }
      onFlashcardsGenerated(response.data);
      setPrompt('');
      setFile(null);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Enter prompt"
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
      />
      <input
        accept=".csv,.txt,.pdf"
        style={{ display: 'none' }}
        id="file-input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <IconButton color="primary" component="span">
          <AttachFileIcon />
        </IconButton>
      </label>
      <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  );
}

export default FlashcardForm;