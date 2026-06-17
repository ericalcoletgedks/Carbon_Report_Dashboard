import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CsvProvider } from './context/CsvContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CsvProvider>
      <App />
    </CsvProvider>
  </StrictMode>,
)
