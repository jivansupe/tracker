from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from ..models.project import ProjectStatus

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: ProjectStatus
    start_date: date
    end_date: Optional[date] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    team_members: List[int] = []

    class Config:
        from_attributes = True

class ProjectUpdate(ProjectBase):
    name: Optional[str] = None
    status: Optional[ProjectStatus] = None
    start_date: Optional[date] = None 