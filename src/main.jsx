import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import routes from './routes/routes'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { AuthProvider } from './components/AuthContext';
import Footer from './components/Footer'

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Footer />
  </StrictMode>,
);