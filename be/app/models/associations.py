from sqlalchemy import Table, Column, ForeignKey
from .base import Base

project_employees = Table(
    "project_employees",
    Base.metadata,
    Column("project_id", ForeignKey("projects.id"), primary_key=True),
    Column("employee_id", ForeignKey("employees.id"), primary_key=True),
) 