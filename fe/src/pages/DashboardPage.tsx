import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as TaskIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

export const DashboardPage: React.FC = () => {
  // Mock data - replace with real data later
  const stats = [
    { title: 'Total Employees', value: '24', icon: <PeopleIcon />, color: '#1976d2' },
    { title: 'Active Projects', value: '7', icon: <WorkIcon />, color: '#2e7d32' },
    { title: 'Pending Tasks', value: '13', icon: <TaskIcon />, color: '#ed6c02' },
    { title: 'Completed Tasks', value: '45', icon: <TrendingUpIcon />, color: '#9c27b0' },
  ];

  const projects = [
    { name: 'Project A', progress: 70, color: '#1976d2' },
    { name: 'Project B', progress: 45, color: '#2e7d32' },
    { name: 'Project C', progress: 90, color: '#ed6c02' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
              elevation={2}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Project Progress */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Project Progress
          </Typography>
          <Stack spacing={3}>
            {projects.map((project) => (
              <Box key={project.name}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{project.name}</Typography>
                  <Typography variant="body2">{project.progress}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${project.color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: project.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}; 