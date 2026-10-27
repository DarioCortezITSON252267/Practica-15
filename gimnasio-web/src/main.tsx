import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import { App } from './App.tsx';
import { SesionProvider } from './sesion/SesionProvider.tsx';

// BrowserRouter envuelve toda la aplicación: lee la URL del navegador y se la da a las rutas.
// SesionProvider le da la sesión a todo lo que está dentro (encabezado y páginas).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <App />
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
);
