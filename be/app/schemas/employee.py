from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, List
from ..models.employee import EmployeeRole

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: EmployeeRole
    department: str
    joining_date: date

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    projects: List[int] = []

    class Config:
        from_attributes = True

class EmployeeUpdate(EmployeeBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[EmployeeRole] = None
    department: Optional[str] = None 