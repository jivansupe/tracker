import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DailyRecord, CreateDailyRecordDto } from '../../types/models';
import * as api from '../../services/api';

interface DailyRecordState {
  records: DailyRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: DailyRecordState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchEmployeeRecords = createAsyncThunk(
  'dailyRecords/fetchEmployeeRecords',
  async (employeeId: number) => {
    return await api.getEmployeeDailyRecords(employeeId);
  }
);

export const createDailyRecord = createAsyncThunk(
  'dailyRecords/createDailyRecord',
  async (record: CreateDailyRecordDto) => {
    return await api.createDailyRecord(record);
  }
);

const dailyRecordSlice = createSlice({
  name: 'dailyRecords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployeeRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch records';
      })
      .addCase(createDailyRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      });
  },
});

export default dailyRecordSlice.reducer; 