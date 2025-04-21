import { useState } from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';
import { Navigation } from './Navigation';
import { CatalogManager } from './CatalogManager';
import { SettingsPanel } from './SettingsPanel';
import { StatsPanel } from './StatsPanel';

export const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('catalog');

  const renderSection = () => {
    switch (activeSection) {
      case 'catalog':
        return <CatalogManager />;
      case 'settings':
        return <SettingsPanel />;
      case 'stats':
        return <StatsPanel />;
      default:
        return <CatalogManager />;
    }
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navigation active={activeSection} onNavigate={setActiveSection} />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          Christian Bot Admin
        </Header>
      }
    >
      {renderSection()}
    </AppShell>
  );
};