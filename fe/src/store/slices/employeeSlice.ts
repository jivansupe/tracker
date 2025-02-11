import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Employee, CreateEmployeeDto } from '../../types/models';
import { getEmployees, createEmployee } from '../../services/api';

interface EmployeeState {
  items: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async () => {
    return await getEmployees();
  }
);

export const addEmployee = createAsyncThunk(
  'employees/add',
  async (employee: CreateEmployeeDto) => {
    return await createEmployee(employee);
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default employeeSlice.reducer; 