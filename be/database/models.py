from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum, Table, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base
from ..models import ProjectStatus, EmployeeRole
from passlib.context import CryptContext

# Association table for many-to-many relationship
project_employee = Table(
    'project_employee',
    Base.metadata,
    Column('project_id', Integer, ForeignKey('projects.id')),
    Column('employee_id', Integer, ForeignKey('employees.id'))
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    status = Column(SQLEnum(ProjectStatus), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    team_members = relationship(
        "Employee",
        secondary=project_employee,
        back_populates="projects"
    )

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(SQLEnum(EmployeeRole), nullable=False)
    department = Column(String, nullable=False)
    joining_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    projects = relationship(
        "Project",
        secondary=project_employee,
        back_populates="team_members"
    )

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password):
        return pwd_context.hash(password) 