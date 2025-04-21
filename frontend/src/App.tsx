import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';
import { MantineProvider } from '@mantine/core';

import { AdminPanel } from './components/AdminPanel';
import { LoginScreen } from './components/LoginScreen';
import { useAuthStore } from './store/auth';

export const App = () => {
  const { isAuthenticated, initAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialiser la Mini App
    WebApp.ready();
    // Vérifier l'authentification
    initAuth();
    setIsReady(true);
  }, []);

  if (!isReady) return <LoadingScreen />;

  return (
    <MantineProvider>
      <div className="app">
        {isAuthenticated ? <AdminPanel /> : <LoginScreen />}
      </div>
    </MantineProvider>
  );
};