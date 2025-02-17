from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from ...models.employee import Employee
from ...schemas.employee import EmployeeCreate, EmployeeResponse, EmployeeUpdate
from ...crud.employee import employee_crud
from ...api import deps

router = APIRouter(prefix="/employees", tags=["employees"])

@router.get("/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(deps.get_db)):
    return employee_crud.get_multi(db)

@router.post("/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(deps.get_db)):
    return employee_crud.create(db, obj_in=employee.dict())

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(deps.get_db)):
    employee = employee_crud.get(db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(deps.get_db)):
    current_employee = employee_crud.get(db, id=employee_id)
    if not current_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee_crud.update(db, db_obj=current_employee, obj_in=employee.dict(exclude_unset=True))

@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(deps.get_db)):
    employee = employee_crud.get(db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    employee_crud.delete(db, id=employee_id)
    return {"message": "Employee deleted"} 