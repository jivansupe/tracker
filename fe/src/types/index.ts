export interface HelloResponse {
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}

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

export interface Project {
    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
    team_members: number[];
}

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: EmployeeRole;
    department: string;
    joining_date: string;
    created_at: string;
    updated_at: string;
    projects: number[];
}

export interface CreateProjectDto {
    name: string;
    description: string;
    status: ProjectStatus;
    start_date: string;
    end_date?: string;
}

export interface CreateEmployeeDto {
    first_name: string;
    last_name: string;
    email: string;
    role: EmployeeRole;
    department: string;
    joining_date: string;
    projects?: number[];
} 