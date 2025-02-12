from pydantic import BaseModel
from datetime import date
from typing import Optional
from ..models.project import ProjectStatus

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: ProjectStatus
    start_date: date
    end_date: Optional[date] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    class Config:
        from_attributes = True 