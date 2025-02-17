from sqlalchemy import Column, Integer, String, Date, Enum as SQLEnum
from sqlalchemy.orm import relationship
from .base import Base
from .associations import project_employees  # Import the association table
from enum import Enum
from datetime import date
from typing import Optional

class ProjectStatus(str, Enum):
    PLANNED = "PLANNED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    ON_HOLD = "ON_HOLD"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    status = Column(SQLEnum(ProjectStatus))
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)

    # Relationships
    team_members = relationship(
        "Employee",
        secondary=project_employees,
        back_populates="projects"
    ) 