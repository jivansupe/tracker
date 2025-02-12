from pydantic import BaseModel, EmailStr
from datetime import date
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

class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True 