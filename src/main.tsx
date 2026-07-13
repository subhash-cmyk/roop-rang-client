import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '16px', background: '#fffaf3', color: '#2D1B1E', border: '1px solid #F5E6B8' } }} />
    </BrowserRouter>
  </React.StrictMode>,
)
