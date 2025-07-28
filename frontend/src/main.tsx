import { createRoot } from 'react-dom/client';
import { UseAuthProvider } from "./hooks/AuthContext";
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <CookiesProvider>
      <UseAuthProvider>
        <App/>
      </UseAuthProvider>
    </CookiesProvider>
  </>,
)
