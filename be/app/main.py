from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import status

from app.models import (
    Project, Employee,
    ProjectCreate, EmployeeCreate,
    ProjectUpdate, EmployeeUpdate,
    Token, UserCreate, User
)
from app.database.base import get_db
from app.database.repository import ProjectRepository, EmployeeRepository, UserRepository
from app.auth import create_access_token, get_current_user

# ... rest of the file 