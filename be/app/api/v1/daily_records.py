from fastapi import APIRouter, HTTPException
from typing import List
from ...models.daily_record import DailyRecord
from ...database import JSONDatabase
import os
from datetime import date

router = APIRouter(prefix="/daily-records", tags=["daily-records"])
db = JSONDatabase[DailyRecord](os.path.join("data", "daily_records.json"), DailyRecord)

@router.get("/", response_model=List[DailyRecord])
def get_daily_records():
    return db.get_all()

@router.post("/", response_model=DailyRecord)
def create_daily_record(record: DailyRecord):
    return db.create(record)

@router.get("/employee/{employee_id}", response_model=List[DailyRecord])
def get_employee_records(employee_id: int):
    records = db.get_all()
    return [r for r in records if r.employee_id == employee_id]

@router.get("/employee/{employee_id}/date/{date}", response_model=List[DailyRecord])
def get_employee_records_by_date(employee_id: int, date: date):
    records = db.get_all()
    return [r for r in records if r.employee_id == employee_id and r.date == date] 