import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  People as EmployeeIcon,
  Assignment as AssignmentIcon,
  ViewInAr as CubeIcon,
} from '@mui/icons-material';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Projects', path: '/projects', icon: <FolderIcon /> },
  { text: 'Employees', path: '/employees', icon: <EmployeeIcon /> },
  { text: 'Daily Records', path: '/daily-records', icon: <AssignmentIcon /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const location = useLocation();
  const theme = useTheme();

  const drawer = (
    <>
      <Toolbar
        sx={{
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CubeIcon 
            sx={{ 
              fontSize: 28,
              color: 'primary.main',
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
      </Toolbar>

      <Box sx={{ px: 3, py: 4 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            px: 2,
            mb: 2,
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          Main items
        </Typography>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem 
                key={item.text} 
                disablePadding 
                sx={{ mb: 1 }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isSelected}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.lighter',
                      '&:hover': {
                        backgroundColor: 'primary.lighter',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                      '& .MuiTypography-root': {
                        color: 'primary.main',
                        fontWeight: 600,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isSelected ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: isSelected ? 600 : 500,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}; 