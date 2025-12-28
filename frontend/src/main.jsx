import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext' // Import this
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Add this wrapper */}
        <App />
      </AuthProvider> {/* Add this wrapper */}
    </BrowserRouter>
  </React.StrictMode>,
)