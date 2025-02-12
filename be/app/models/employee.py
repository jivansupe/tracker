from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum
from typing import Optional

class EmployeeRole(str, Enum):
    MANAGER = "MANAGER"
    TECH_LEAD = "TECH_LEAD"
    SENIOR_ENGINEER = "SENIOR_ENGINEER"
    ENGINEER = "ENGINEER"

class Employee(BaseModel):
    id: Optional[int] = None
    first_name: str
    last_name: str
    email: EmailStr
    role: EmployeeRole
    department: str
    joining_date: date 