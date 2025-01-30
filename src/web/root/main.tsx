import { DiscordAuthProvider, PreloaderProvider, ThemeProvider } from '../providers';
import { createRoot } from 'react-dom/client';
import Metadata from '../config/meta';
import Routes from '../config/routes';
import '../assets/styles/index.css';
import { StrictMode } from 'react';

createRoot(document.getElementById('dev_ipuppyyyt')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <PreloaderProvider>
        <DiscordAuthProvider>
          <Metadata />
          <Routes />
        </DiscordAuthProvider>
      </PreloaderProvider>
    </ThemeProvider>
  </StrictMode>,
)