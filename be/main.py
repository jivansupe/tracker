from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import status

from .models import (
    Project, Employee,
    ProjectCreate, EmployeeCreate,
    ProjectUpdate, EmployeeUpdate,
    Token, UserCreate, User
)
from .database.base import get_db
from .database.repository import ProjectRepository, EmployeeRepository, UserRepository
from .auth import create_access_token, get_current_user

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Project endpoints
@app.post("/api/projects", response_model=Project)
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return ProjectRepository.create_project(db, project)

@app.get("/api/projects", response_model=List[Project])
async def get_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return ProjectRepository.get_projects(db, skip, limit)

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    project = ProjectRepository.get_project(db, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# Employee endpoints
@app.post("/api/employees", response_model=Employee)
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return EmployeeRepository.create_employee(db, employee)

@app.get("/api/employees", response_model=List[Employee])
async def get_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return EmployeeRepository.get_employees(db, skip, limit)

@app.get("/api/employees/{employee_id}", response_model=Employee)
async def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = EmployeeRepository.get_employee(db, employee_id)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@app.get("/api/hello")
async def read_root():
    return {"message": "Hello from FastAPI!"}

# Add these new endpoints
@app.post("/api/auth/register", response_model=User)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserRepository.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = UserRepository.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    return UserRepository.create_user(db=db, user=user)

@app.post("/api/auth/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    user = UserRepository.get_user_by_username(db, username=form_data.username)
    if not user or not user.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)]
):
    return current_user 