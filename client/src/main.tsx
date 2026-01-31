import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GamificationProvider } from './contexts/GamificationContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

console.log('LUMINA: INITIALIZING RENDER BRIDGE...');

const rootElement = document.getElementById('root');

if (rootElement) {
  console.log('LUMINA: TARGET NODE ACQUIRED.');
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <GamificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GamificationProvider>
    </StrictMode>
  );
  console.log('LUMINA: SYNCHRONIZATION COMMENCED.');
} else {
  console.error('LUMINA: FATAL - TARGET NODE "root" NOT FOUND IN DOM.');
}
