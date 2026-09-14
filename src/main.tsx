import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { PageLoader } from './components/ui/PageLoader.tsx';
import './styles/reset.css';

function Root() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <App />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
);
