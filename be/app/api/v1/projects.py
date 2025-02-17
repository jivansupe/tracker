from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from ...models.project import Project
from ...schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from ...crud.project import project_crud
from ...api import deps
import logging

router = APIRouter(prefix="/projects", tags=["projects"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(deps.get_db)):
    try:
        return project_crud.get_multi(db)
    except Exception as e:
        logger.error(f"Error getting projects: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(deps.get_db)):
    try:
        return project_crud.create(db, obj_in=project.dict())
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(deps.get_db)):
    project = project_crud.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectCreate, db: Session = Depends(deps.get_db)):
    updated_project = project_crud.update(db, db_obj=project, obj_in=project.dict())
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}", response_model=dict)
def delete_project(project_id: int, db: Session = Depends(deps.get_db)):
    if not project_crud.delete(db, id=project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"} 