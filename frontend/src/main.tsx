import { createRoot } from 'react-dom/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { CookiesProvider } from 'react-cookie';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
  </>,
)
