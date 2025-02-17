from typing import List
from sqlalchemy.orm import Session
from ..models.project import Project
from .base import CRUDBase

class CRUDProject(CRUDBase[Project]):
    pass

project_crud = CRUDProject(Project) 