// import React from 'react';
import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import './App.css';

function App() {
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
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', sm: '3rem' }, textAlign: 'center' }}
        >
          Obscura
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {`(Origin from Latin obscurare ‘to darken, conceal’)`}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
          {`Obscura helps safeguard sensitive information by providing robust text anonymization and data protection. It efficiently detects and anonymizes private entities in text, including personal names, addresses, financial data, social security numbers, credit card details, phone numbers, and other sensitive identifiers. Designed for speed and accuracy, Obscura ensures data privacy while maintaining contextual integrity in documents, chat logs, and structured data.`}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mt: 4 }}>
          <ul style={{ textAlign: 'left', paddingLeft: '1rem', margin: 0 }}>
            <li>Allow organizations to preserve privacy in a simpler way by democratizing de-identification technologies and introducing transparency in decisions.</li>
            <li>Embrace extensibility and customizability to a specific business need.</li>
            <li>Facilitate both fully automated and semi-automated PII de-identification flows on multiple platforms.</li>
          </ul>
        </Typography>
		
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Obscura Detection Flow
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'nowrap', overflowX: 'auto', mt: 4 }}>
            {['🟠', '🔴', '🟢', '🔵', '⚫'].map((icon, index) => {
              const titles = ['Regex', 'NER(ML)', 'Checksum', 'Context Words', 'Anonymization'];
              const descriptions = [
                'Pattern recognition',
                'Leveraging natural language to detect entities',
                'Validate patterns (if applicable)',
                'Increase detection confidence',
                'Multiple anonymization techniques'
              ];
              return (
                <Box
                  key={index}
                  sx={{
                    textAlign: 'center',
                    minWidth: { xs: '80px', sm: '120px' },
                    mx: 2,
                    my: 1
                  }}
                >
                  <Typography
                    variant="h3"
                    className="bouncing-ball"
                    sx={{ fontSize: { xs: '1.5rem', sm: '2.5rem' } }}
                  >
                    {icon}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1, whiteSpace: 'normal' }}>
                    {titles[index]}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
                    {descriptions[index]}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ mt: 6, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1, border: '1px solid #ddd', p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Input Section
              </Typography>
              <Typography variant="body2">
                Hi, my name is <span style={{ color: 'blue' }}>David</span> and my number is{' '}
                <span style={{ color: 'green' }}>212 555 1234</span>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                ("David" → &lt;PERSON&gt;, "212 555 1234" → &lt;PHONE_NUMBER&gt;)
              </Typography>
            </Box>
            <Box sx={{ flex: 1, border: '1px solid #ddd', p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Output Section
              </Typography>
              <Typography variant="body2">
                Hi, my name is{' '}
                <span style={{ backgroundColor: '#000', color: '#fff', borderRadius: '12px', padding: '2px 6px' }}>
                  &lt;PERSON&gt;
                </span>{' '}
                and my number is{' '}
                <span style={{ backgroundColor: '#000', color: '#fff', borderRadius: '12px', padding: '2px 6px' }}>
                  &lt;PHONE_NUMBER&gt;
                </span>
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
            *NER – Named Entity Recognition
          </Typography>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" href="/text-anonymization">
              Try Now
            </Button>
          </Box>
        </Box>
      </Container>
      <Box component="footer" sx={{ py: 3, mt: 'auto', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2">&copy; 2025 Inde 412 Group 4</Typography>
      </Box>
    </Box>
  );
}

export default App;