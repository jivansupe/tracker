from sqlalchemy import Column, Integer, String, Date, Enum as SQLEnum
from sqlalchemy.orm import relationship
from .base import Base
from .associations import project_employees  # Import the association table
from enum import Enum

class EmployeeRole(str, Enum):
    MANAGER = "MANAGER"
    TECH_LEAD = "TECH_LEAD"
    SENIOR_ENGINEER = "SENIOR_ENGINEER"
    ENGINEER = "ENGINEER"

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    role = Column(SQLEnum(EmployeeRole))
    department = Column(String)
    joining_date = Column(Date)

    # Relationships
    projects = relationship(
        "Project",
        secondary=project_employees,
        back_populates="team_members"
    ) 