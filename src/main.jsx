import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routerBlog from './router/Router'
import { AuthProvider } from './context/AuthContext'

// Importar el tester de email en desarrollo
if (import.meta.env.DEV) {
    import('./services/EmailTester.js')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routerBlog} />
    </AuthProvider>
  </StrictMode>,
)
