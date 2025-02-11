import axios from 'axios';
import {
    Project, Employee,
    CreateProjectDto, CreateEmployeeDto,
    ApiResponse, ApiError
} from '../types/models';
import { HelloResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Hello endpoint
export const getHello = async (): Promise<HelloResponse> => {
  try {
    const response = await api.get<HelloResponse>('/hello');
    return response.data;
  } catch (error) {
    console.error('Error fetching hello:', error);
    throw error;
  }
};

// Project APIs
export const createProject = async (project: CreateProjectDto): Promise<Project> => {
  const response = await api.post<Project>('/projects', project);
  return response.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const getProject = async (id: number): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
};

// Employee APIs
export const createEmployee = async (employee: CreateEmployeeDto): Promise<Employee> => {
  const response = await api.post<Employee>('/employees', employee);
  return response.data;
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get<Employee[]>('/employees');
  return response.data;
};

export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await api.get<Employee>(`/employees/${id}`);
  return response.data;
}; 