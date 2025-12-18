# 🗒️ To-Do App with Authentication

## Project Description
This is a full-stack **To-Do application** built with **React (frontend)** and **Flask + SQLAlchemy (backend)**.  
Users can **register, log in, and manage personal tasks** securely. Each user’s tasks are private and linked to their account. Tasks include **title, priority, due date**, and **completion status**.

---

## Technologies Used
- **Frontend:** React, Vite, JavaScript, CSS  
- **Backend:** Flask, Flask-Login, Flask-SQLAlchemy, Flask-CORS  
- **Database:** SQLite  
- **Other:** Fetch API for frontend-backend communication, Werkzeug for password hashing  

---

## Setup and Run Instructions

 Backend

cd to-do-backend
python3 -m venv venv
source venv/bin/activate
pip install Flask Flask-SQLAlchemy Flask-Login Flask-Cors werkzeug


### Create a DataBase
```bash
from app import db, app
with app.app_context():
    db.create_all()

```bash
### Start the backend Server
python app.py

# FrontEnd
```bash
cd ../todo-frontend
npm install
npm run dev

Core Functionality

User Authentication: Register, login, logout

Task Management: Add, update (toggle complete), delete tasks

Task Attributes: Title, priority (High/Medium/Low), due date, completed status

Filtering & Sorting: Filter by completion (All/Completed/Pending), sort by priority

UI Features: Line-through for completed tasks, responsive layout, task-specific buttons

API Integration: Frontend fetches data dynamically; backend enforces user-specific access
