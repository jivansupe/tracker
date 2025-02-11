from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.base import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .main import *  # This imports all routes 