import { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Button, Container, Typography, Box, TextField } from '@mui/material';
import './App.css';

function TextAnonymization() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8765/text-anonymize',
        { text: inputText },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      setOutputText(response.data.anonymizedText);
    } catch (error) {
      console.error(error);
      setOutputText("Backend not connected (possibly due to CORS). Please check your connection.");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <AppBar sx={{ backgroundColor: '#546d78' }}>
        <Toolbar sx={{ gap: 6, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/image-anonymization">Image Anonymization</Button>
          <Button color="inherit" href="/text-anonymization">Text Anonymization</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: { xs: 10, sm: 8 }, mb: { xs: 2, sm: 4 }, flex: 1 }}>
        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', fontSize: { xs: '2rem', sm: '3rem' } }}>
          Obscura - Text Anonymization
        </Typography>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Enter text"
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Box>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={handleGenerate}>
            Generate Output
          </Button>
        </Box>
        {outputText && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Anonymized Text:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {outputText}
            </Typography>
          </Box>
        )}
      </Container>
      <Box component="footer" sx={{ py: 3, mt: 'auto', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2">
          &copy; 2025 Inde 412 Group 4
        </Typography>
      </Box>
    </Box>
  );
}

export default TextAnonymization;
