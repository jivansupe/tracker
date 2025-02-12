import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import employeeReducer from './slices/employeeSlice';
import dailyRecordReducer from './slices/dailyRecordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    employees: employeeReducer,
    dailyRecords: dailyRecordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 