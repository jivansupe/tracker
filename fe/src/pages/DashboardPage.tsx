import React from 'react';
import { Box, Typography, Card, LinearProgress } from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as TaskIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const statsCards = [
  {
    title: 'Users',
    value: '14k',
    change: '+25%',
    period: 'Last 30 days',
    trend: 'up',
    icon: <PeopleIcon />,
  },
  {
    title: 'Active Projects',
    value: '325',
    change: '-25%',
    period: 'Last 30 days',
    trend: 'down',
    icon: <WorkIcon />,
  },
  {
    title: 'Pending Tasks',
    value: '200k',
    change: '+5%',
    period: 'Last 30 days',
    trend: 'up',
    icon: <TaskIcon />,
  },
  {
    title: 'Completed Tasks',
    value: '45',
    change: '+8%',
    period: 'Last 30 days',
    trend: 'up',
    icon: <TrendingUpIcon />,
  },
];

const projects = [
  { name: 'Project A', progress: 70, color: '#2196f3' },
  { name: 'Project B', progress: 45, color: '#4caf50' },
  { name: 'Project C', progress: 90, color: '#ff9800' },
];

export const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h5">
          Dashboard
        </Typography>
        <Typography variant="body2">
          Overview
        </Typography>
      </Box>

      <Box>
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <Box>
              <Box>
                <Typography variant="body2">
                  {stat.title}
                </Typography>
                <Typography variant="h4">
                  {stat.value}
                </Typography>
              </Box>
              <Box>
                {stat.icon}
              </Box>
            </Box>
            <Box>
              <Typography variant="body2">
                {stat.change}
              </Typography>
              <Typography variant="body2">
                {stat.period}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Card>
        <Typography variant="h6">
          Project Progress
        </Typography>
        <Box>
          {projects.map((project) => (
            <Box key={project.name}>
              <Box>
                <Typography variant="body1">
                  {project.name}
                </Typography>
                <Typography variant="body2">
                  {project.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={project.progress}
              />
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}; 