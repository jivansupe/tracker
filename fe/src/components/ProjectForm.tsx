import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  DialogActions,
  Stack,
} from '@mui/material';
import { CreateProjectDto, ProjectStatus } from '../types';

interface ProjectFormProps {
  onSubmit: (project: CreateProjectDto) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateProjectDto>({
    name: '',
    description: '',
    status: ProjectStatus.PLANNED,
    start_date: '',
    end_date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3} sx={{ p: 2 }}>
        <TextField
          fullWidth
          required
          label="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <TextField
          select
          fullWidth
          required
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
        >
          {Object.values(ProjectStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          required
          type="date"
          label="Start Date"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          type="date"
          label="End Date"
          value={formData.end_date}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <DialogActions sx={{ p: 2, pt: 3 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Create Project
        </Button>
      </DialogActions>
    </Box>
  );
}; 