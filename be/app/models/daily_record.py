from pydantic import BaseModel
from datetime import date
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    COMPLETED = "COMPLETED"
    IN_PROGRESS = "IN_PROGRESS"
    BLOCKED = "BLOCKED"
    NOT_STARTED = "NOT_STARTED"

class DailyRecord(BaseModel):
    id: Optional[int] = None
    employee_id: int
    date: date
    project_id: int
    hours_worked: float
    tasks_completed: str
    status: TaskStatus
    notes: Optional[str] = None 