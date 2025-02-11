import * as React from 'react';
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
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { EmployeeForm } from '../components/EmployeeForm';
import { CreateEmployeeDto, Employee, EmployeeRole } from '../types/models';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEmployees, addEmployee } from '../store/slices/employeeSlice';

export const EmployeesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: employees, loading, error } = useAppSelector(state => state.employees);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleCreateEmployee = async (employee: CreateEmployeeDto) => {
    try {
      await dispatch(addEmployee(employee)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  const getRoleColor = (role: EmployeeRole) => {
    switch (role) {
      case EmployeeRole.MANAGER:
        return 'error';
      case EmployeeRole.TECH_LEAD:
        return 'warning';
      case EmployeeRole.SENIOR_ENGINEER:
        return 'success';
      case EmployeeRole.ENGINEER:
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Employee
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>
                        {employee.first_name[0]}
                        {employee.last_name[0]}
                      </Avatar>
                      <Typography>
                        {employee.first_name} {employee.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.role}
                      color={getRoleColor(employee.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{new Date(employee.joining_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
        <DialogTitle sx={{ pb: 1 }}>Add New Employee</DialogTitle>
        <EmployeeForm 
          onSubmit={handleCreateEmployee} 
          onCancel={() => setOpen(false)} 
        />
      </Dialog>
    </Box>
  );
}; 