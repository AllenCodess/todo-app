from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change in production
CORS(app, supports_credentials=True)  # Allow cookies

# Database setup
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'database.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)

# Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    tasks = db.relationship('Task', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(10), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.String(10), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create database
with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'msg': 'Username already exists'}), 400
    user = User(username=data['username'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({'msg': 'Logged in successfully'})
    return jsonify({'msg': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'msg': 'Logged out successfully'})

@app.route('/tasks', methods=['GET'])
@login_required
def get_tasks():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'priority': t.priority,
        'completed': t.completed,
        'due_date': t.due_date
    } for t in tasks])

@app.route('/tasks', methods=['POST'])
@login_required
def add_task():
    data = request.json
    task = Task(
        title=data['title'],
        priority=data['priority'],
        completed=data.get('completed', False),
        due_date=data.get('due_date'),
        user_id=current_user.id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({'id': task.id}), 201

@app.route('/tasks/<int:id>', methods=['PATCH'])
@login_required
def toggle_complete(id):
    task = Task.query.get_or_404(id)
    if task.user_id != current_user.id:
        return jsonify({'msg': 'Unauthorized'}), 403
    task.completed = not task.completed
    db.session.commit()
    return jsonify({'completed': task.completed})

@app.route('/tasks/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get_or_404(id)
    if task.user_id != current_user.id:
        return jsonify({'msg': 'Unauthorized'}), 403
    db.session.delete(task)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
