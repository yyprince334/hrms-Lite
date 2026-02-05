# HRMS Lite – Full-Stack Application

## Overview
HRMS Lite is a lightweight Human Resource Management System designed as a simple internal HR tool. The application allows an admin to manage employee records and track daily attendance through a clean, professional, and production-ready web interface.

The focus of this project is on delivering a stable, usable, and well-structured application rather than over-engineering additional features.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Python (FastAPI)
- SQLAlchemy
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## Features

### Employee Management
- Add new employees with the following details:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View a list of all employees
- Delete an employee
- Server-side validations:
  - Required fields validation
  - Valid email format enforcement
  - Duplicate employee handling with meaningful error messages

### Attendance Management
- Mark daily attendance for employees with:
  - Date
  - Status (Present / Absent)
- View attendance records per employee
- Prevent duplicate attendance entries for the same employee on the same date

---

## Live Application URLs

- Frontend: https://<your-frontend-url>.vercel.app  
- Backend API: https://hrms-lite-backend-nhpl.onrender.com  
- Backend API Documentation (Swagger): https://hrms-lite-backend-nhpl.onrender.com/docs  

---

## Project Structure
```
hrms-lite/
│
├── backend/
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI entry point
│   │   ├── database.py            # DB connection & session
│   │   ├── models.py              # SQLAlchemy models
│   │   ├── schemas.py             # Pydantic schemas
│   │   ├── crud.py                # DB operations
│   │   │
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── employees.py       # Employee APIs
│   │       └── attendance.py      # Attendance APIs
│   │
│   ├── requirements.txt           # Python dependencies
│   ├── Dockerfile                 # Container config (production-safe)
│   └── .env.example               # Example env vars (not committed)
│
├── frontend/
│   │
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   │
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeForm.jsx
│   │   │   │   └── EmployeeList.jsx
│   │   │   │
│   │   │   └── attendance/
│   │   │       ├── AttendanceForm.jsx
│   │   │       └── AttendanceList.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx      # Main UI page
│   │   │
│   │   ├── services/
│   │   │   └── api.js              # Axios instance
│   │   │
│   │   ├── App.jsx                # App root
│   │   ├── main.jsx               # React entry
│   │   └── index.css              # Tailwind base styles
│   │
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Run the Project Locally

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```
