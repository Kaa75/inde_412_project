import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import TextAnonymization from './TextAnonymization.tsx'
import ImageAnonymization from './ImageAnonymization.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/text-anonymization" element={<TextAnonymization />} />
        <Route path="/image-anonymization" element={<ImageAnonymization />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
