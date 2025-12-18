from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(10), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.String(10), nullable=True)  # format: 'YYYY-MM-DD'
