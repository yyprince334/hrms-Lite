from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List
from enum import Enum

# ---------- Employee ----------

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Attendance ----------



class AttendanceStatus(str, Enum):
    Present = "Present"
    Absent = "Absent"

class AttendanceBase(BaseModel):
    date: date
    status: AttendanceStatus


class AttendanceCreate(AttendanceBase):
    employee_id: int


class AttendanceResponse(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True