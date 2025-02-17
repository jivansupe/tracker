from typing import List
from sqlalchemy.orm import Session
from ..models.employee import Employee
from .base import CRUDBase

class CRUDEmployee(CRUDBase[Employee]):
    pass

employee_crud = CRUDEmployee(Employee) 