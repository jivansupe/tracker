import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  DialogActions,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { CreateEmployeeDto, EmployeeRole, Project } from '../types';
import { getProjects } from '../services/api.ts';

interface EmployeeFormProps {
  onSubmit: (employee: CreateEmployeeDto & { projects: number[] }) => void;
  onCancel: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateEmployeeDto & { projects: number[] }>({
    first_name: '',
    last_name: '',
    email: '',
    role: EmployeeRole.ENGINEER,
    department: '',
    joining_date: '',
    projects: [],
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsList = await getProjects();
        setProjects(projectsList);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getProjectName = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : '';
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3} sx={{ p: 2 }}>
        <TextField
          fullWidth
          required
          label="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />

        <TextField
          fullWidth
          required
          label="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />

        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <TextField
          select
          fullWidth
          required
          label="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as EmployeeRole })}
        >
          {Object.values(EmployeeRole).map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          required
          label="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />

        <TextField
          fullWidth
          required
          type="date"
          label="Joining Date"
          value={formData.joining_date}
          onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth>
          <InputLabel id="projects-label">Assign Projects</InputLabel>
          <Select
            labelId="projects-label"
            multiple
            value={formData.projects}
            onChange={(e) => {
              const value = e.target.value as number[];
              setFormData({ ...formData, projects: value });
            }}
            input={<OutlinedInput label="Assign Projects" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as number[]).map((projectId) => (
                  <Chip 
                    key={projectId} 
                    label={getProjectName(projectId)}
                    size="small"
                  />
                ))}
              </Box>
            )}
            disabled={loading}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <DialogActions sx={{ p: 2, pt: 3 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Create Employee
        </Button>
      </DialogActions>
    </Box>
  );
}; 