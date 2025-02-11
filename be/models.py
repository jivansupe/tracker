from enum import Enum
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

# Enums
class ProjectStatus(str, Enum):
    PLANNED = "PLANNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    ON_HOLD = "ON_HOLD"

class EmployeeRole(str, Enum):
    ENGINEER = "ENGINEER"
    SENIOR_ENGINEER = "SENIOR_ENGINEER"
    TECH_LEAD = "TECH_LEAD"
    MANAGER = "MANAGER"

# Base Models
class ProjectBase(BaseModel):
    name: str
    description: str
    status: ProjectStatus
    start_date: datetime
    end_date: Optional[datetime] = None

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    role: EmployeeRole
    department: str
    joining_date: datetime
    projects: List[int] = []

# Create DTOs
class ProjectCreate(ProjectBase):
    team_members: List[int] = []

class EmployeeCreate(EmployeeBase):
    pass

# Response Models
class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime
    team_members: List[int] = []

    class Config:
        from_attributes = True

class Employee(EmployeeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Update Models
class ProjectUpdate(ProjectBase):
    team_members: Optional[List[int]] = None

class EmployeeUpdate(EmployeeBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[EmployeeRole] = None
    department: Optional[str] = None
    joining_date: Optional[datetime] = None
    projects: Optional[List[int]] = None

# Add password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Add User-related models
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None 