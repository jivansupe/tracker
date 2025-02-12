from fastapi import APIRouter, HTTPException
from typing import List
from ...models.employee import Employee
from ...database import JSONDatabase
import os

router = APIRouter(prefix="/employees", tags=["employees"])
db = JSONDatabase[Employee](os.path.join("data", "employees.json"), Employee)

@router.get("/", response_model=List[Employee])
def get_employees():
    return db.get_all()

@router.post("/", response_model=Employee)
def create_employee(employee: Employee):
    return db.create(employee)

@router.get("/{employee_id}", response_model=Employee)
def get_employee(employee_id: int):
    employee = db.get_by_id(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/{employee_id}", response_model=Employee)
def update_employee(employee_id: int, employee: Employee):
    updated_employee = db.update(employee_id, employee)
    if not updated_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated_employee

@router.delete("/{employee_id}")
def delete_employee(employee_id: int):
    if not db.delete(employee_id):
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted"} 