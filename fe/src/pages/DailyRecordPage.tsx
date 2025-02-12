import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchEmployeeRecords, createDailyRecord } from '../store/slices/dailyRecordSlice';
import { fetchProjects } from '../store/slices/projectSlice';
import { DailyRecord, TaskStatus } from '../types/models';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export const DailyRecordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { records, loading } = useSelector((state: RootState) => state.dailyRecords);
  const { projects } = useSelector((state: RootState) => state.projects);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  
  const [formData, setFormData] = useState({
    project_id: '',
    hours_worked: '',
    tasks_completed: '',
    status: TaskStatus.NOT_STARTED,
    notes: ''
  });

  useEffect(() => {
    // Fetch both projects and employee records when component mounts
    dispatch(fetchProjects());
    const employeeId = 1; // Replace with actual employee ID
    dispatch(fetchEmployeeRecords(employeeId));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employeeId = 1; // Replace with actual employee ID
    
    await dispatch(createDailyRecord({
      employee_id: employeeId,
      date: selectedDate.format('YYYY-MM-DD'),
      project_id: parseInt(formData.project_id),
      hours_worked: parseFloat(formData.hours_worked),
      tasks_completed: formData.tasks_completed,
      status: formData.status,
      notes: formData.notes
    }));

    // Reset form
    setFormData({
      project_id: '',
      hours_worked: '',
      tasks_completed: '',
      status: TaskStatus.NOT_STARTED,
      notes: ''
    });
  };

  if (loading) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <h1>Daily Work Record</h1>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mb: 4 }}>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue || dayjs())}
          sx={{ mb: 2, width: '100%' }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Project</InputLabel>
          <Select
            value={formData.project_id}
            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
          >
            {projects?.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          type="number"
          label="Hours Worked"
          value={formData.hours_worked}
          onChange={(e) => setFormData({ ...formData, hours_worked: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Tasks Completed"
          value={formData.tasks_completed}
          onChange={(e) => setFormData({ ...formData, tasks_completed: e.target.value })}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          >
            {Object.values(TaskStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Notes"
          multiline
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit Daily Record
        </Button>
      </Box>

      <Box>
        <h2>Recent Records</h2>
        {records?.map((record) => (
          <Box key={record.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
            <p>Date: {record.date}</p>
            <p>Project: {projects?.find(p => p.id === record.project_id)?.name}</p>
            <p>Hours: {record.hours_worked}</p>
            <p>Tasks: {record.tasks_completed}</p>
            <p>Status: {record.status}</p>
            {record.notes && <p>Notes: {record.notes}</p>}
          </Box>
        ))}
      </Box>
    </Box>
  );
}; 