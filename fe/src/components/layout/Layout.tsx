import * as React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="layout">
      <Header onMenuClick={handleDrawerToggle} />
      <div className="layout-content">
        <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <main className="main-content">
          <Toolbar />
          {children}
        </main>
      </div>
    </div>
  );
}; 