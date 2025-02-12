// Enums
export enum ProjectStatus {
    PLANNED = "PLANNED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD"
}

export enum EmployeeRole {
    ENGINEER = "ENGINEER",
    SENIOR_ENGINEER = "SENIOR_ENGINEER",
    TECH_LEAD = "TECH_LEAD",
    MANAGER = "MANAGER"
}

export enum TaskStatus {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
    BLOCKED = "BLOCKED",
    NOT_STARTED = "NOT_STARTED"
}

// Base Interfaces
export interface ProjectBase {
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date?: string;
}

export interface EmployeeBase {
    first_name: string;
    last_name: string;
    email: string;
    role: EmployeeRole;
    department: string;
    joining_date: string;
    projects: number[];
}

// Create DTOs
export interface CreateProjectDto extends ProjectBase {
    team_members?: number[];
}

export interface CreateEmployeeDto extends EmployeeBase {}

// Response Models
export interface Project extends ProjectBase {
    id: number;
    created_at: string;
    updated_at: string;
    team_members: number[];
}

export interface Employee extends EmployeeBase {
    id: number;
    created_at: string;
    updated_at: string;
}

// Update DTOs
export interface UpdateProjectDto extends Partial<ProjectBase> {
    team_members?: number[];
}

export interface UpdateEmployeeDto extends Partial<EmployeeBase> {}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiError {
    message: string;
    status: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
}

export interface DailyRecord {
    id?: number;
    employee_id: number;
    date: string;
    project_id: number;
    hours_worked: number;
    tasks_completed: string;
    status: TaskStatus;
    notes?: string;
}

export interface CreateDailyRecordDto extends Omit<DailyRecord, 'id'> {} 