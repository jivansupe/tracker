import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjects, addProject } from '../store/slices/projectSlice';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { ProjectForm } from '../components/ProjectForm';
import { CreateProjectDto, Project, ProjectStatus } from '../types/models';

export const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: projects, loading, error } = useAppSelector(state => state.projects);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = async (project: CreateProjectDto) => {
    try {
      await dispatch(addProject(project)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PLANNED:
        return 'default';
      case ProjectStatus.IN_PROGRESS:
        return 'primary';
      case ProjectStatus.COMPLETED:
        return 'success';
      case ProjectStatus.ON_HOLD:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getProgressValue = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PLANNED:
        return 0;
      case ProjectStatus.IN_PROGRESS:
        return 50;
      case ProjectStatus.COMPLETED:
        return 100;
      case ProjectStatus.ON_HOLD:
        return 30;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Projects Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Add Project
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {projects.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', py: 4, borderRadius: 2 }}>
              <CardContent>
                <TimelineIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography color="text.secondary">No projects found</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      color={getStatusColor(project.status)}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <LinearProgress 
                      variant="determinate" 
                      value={getProgressValue(project.status)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Start: {new Date(project.start_date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        End: {project.end_date ? new Date(project.end_date).toLocaleDateString() : '-'}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Create New Project</DialogTitle>
        <ProjectForm 
          onSubmit={handleCreateProject} 
          onCancel={() => setOpen(false)} 
        />
      </Dialog>
    </Box>
  );
}; 