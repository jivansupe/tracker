from sqlalchemy.orm import Session
from datetime import datetime
from . import models
from ..models import ProjectCreate, EmployeeCreate, ProjectUpdate, EmployeeUpdate, UserCreate

class ProjectRepository:
    @staticmethod
    def create_project(db: Session, project: ProjectCreate):
        db_project = models.Project(**project.dict(exclude={'team_members'}))
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def get_projects(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Project).offset(skip).limit(limit).all()

    @staticmethod
    def get_project(db: Session, project_id: int):
        return db.query(models.Project).filter(models.Project.id == project_id).first()

    @staticmethod
    def update_project(db: Session, project_id: int, project: ProjectUpdate):
        db_project = ProjectRepository.get_project(db, project_id)
        if db_project:
            for key, value in project.dict(exclude_unset=True).items():
                setattr(db_project, key, value)
            db_project.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(db_project)
        return db_project

class EmployeeRepository:
    @staticmethod
    def create_employee(db: Session, employee: EmployeeCreate):
        db_employee = models.Employee(**employee.dict(exclude={'projects'}))
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee

    @staticmethod
    def get_employees(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Employee).offset(skip).limit(limit).all()

    @staticmethod
    def get_employee(db: Session, employee_id: int):
        return db.query(models.Employee).filter(models.Employee.id == employee_id).first()

    @staticmethod
    def update_employee(db: Session, employee_id: int, employee: EmployeeUpdate):
        db_employee = EmployeeRepository.get_employee(db, employee_id)
        if db_employee:
            for key, value in employee.dict(exclude_unset=True).items():
                setattr(db_employee, key, value)
            db_employee.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(db_employee)
        return db_employee

class UserRepository:
    @staticmethod
    def create_user(db: Session, user: UserCreate):
        hashed_password = models.User.get_password_hash(user.password)
        db_user = models.User(
            email=user.email,
            username=user.username,
            hashed_password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user_by_username(db: Session, username: str):
        return db.query(models.User).filter(models.User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first() 