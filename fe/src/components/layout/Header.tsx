import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ViewInAr as CubeIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ 
            mr: 2,
            display: { sm: 'none' },
            color: 'text.primary',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CubeIcon 
            sx={{ 
              fontSize: 28,
              color: 'primary.main',
              display: { xs: 'none', sm: 'block' }
            }} 
          />
          <Typography 
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Toolpad
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <IconButton
            size="medium"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <DarkModeIcon />
          </IconButton>
          <IconButton
            onClick={handleLogout}
            size="medium"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 