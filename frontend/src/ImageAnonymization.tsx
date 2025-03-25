import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import './App.css';

function ImageAnonymization() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleAnonymizeImage = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8765/image-anonymize',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*" } }
      );
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error(error);
      alert("Backend not connected (possibly due to CORS). Please check your connection.");
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
          Obscura - Image Anonymization
        </Typography>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" component="label">
            Upload Image
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Button variant="contained" onClick={handleAnonymizeImage} sx={{ ml: 2 }}>
              Anonymize Image
            </Button>
          )}
        </Box>
        {imageUrl && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Anonymized Image Preview:
            </Typography>
            <img
              src={imageUrl}
              alt="Anonymized"
              style={{ width: '100%', maxWidth: '500px' }} // removed blur filter
            />
            <Box sx={{ mt: 2 }}>
              <a href={imageUrl} download="anonymized-image.png" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Download Anonymized Image</Button>
              </a>
            </Box>
          </Box>
        )}
      </Container>
      <Box component="footer" sx={{ py: 3, mt: 'auto', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2">&copy; 2025 Inde 412 Group 4</Typography>
      </Box>
    </Box>
  );
}

export default ImageAnonymization;
