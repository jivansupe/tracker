from pydantic import BaseModel
from datetime import date
from enum import Enum
from typing import Optional

class ProjectStatus(str, Enum):
    PLANNED = "PLANNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    ON_HOLD = "ON_HOLD"

class Project(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNED
    start_date: date
    end_date: Optional[date] = None 