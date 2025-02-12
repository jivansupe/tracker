from fastapi import APIRouter, HTTPException
from typing import List
from ...models.project import Project
from ...database import JSONDatabase
import os

router = APIRouter(prefix="/projects", tags=["projects"])
db = JSONDatabase[Project](os.path.join("data", "projects.json"), Project)

@router.get("/", response_model=List[Project])
def get_projects():
    return db.get_all()

@router.post("/", response_model=Project)
def create_project(project: Project):
    return db.create(project)

@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int):
    project = db.get_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=Project)
def update_project(project_id: int, project: Project):
    updated_project = db.update(project_id, project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}")
def delete_project(project_id: int):
    if not db.delete(project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"} 