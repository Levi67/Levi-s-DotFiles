from flask import Flask, jsonify, render_template, request
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)

# File path for JSON database
TASKS_FILE = 'tasks.json'

# Initialize tasks file if it doesn't exist
def init_tasks_file():
    if not os.path.exists(TASKS_FILE):
        default_tasks = [
            {
                "id": str(uuid.uuid4()),
                "name": "Welcome Task",
                "description": "This is your first task! You can edit or delete it.",
                "due_date": "2025-08-10",
                "due_time": "14:00",
                "completed": False,
                "created_at": datetime.now().isoformat()
            }
        ]
        with open(TASKS_FILE, 'w') as f:
            json.dump(default_tasks, f, indent=2)

# Load tasks from JSON file
def load_tasks():
    try:
        with open(TASKS_FILE, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        init_tasks_file()
        return load_tasks()

# Save tasks to JSON file
def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)

# Dummy weather data
weather_data = {
    "location": "Your City",
    "temperature": "22°C", 
    "condition": "Partly Cloudy",
    "icon": "🌤️"
}

# Sample pins
pins_data = [
    {"name": "YouTube", "url": "https://youtube.com", "icon": "🎥"},
    {"name": "GitHub", "url": "https://github.com", "icon": "🐙"},
    {"name": "Reddit", "url": "https://reddit.com", "icon": "👽"},
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/weather")
def weather():
    return jsonify(weather_data)

@app.route("/api/pins")
def pins():
    return jsonify(pins_data)

# GET all tasks
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = load_tasks()
    # Sort tasks by due date/time
    tasks.sort(key=lambda x: (x.get('due_date', '9999-12-31'), x.get('due_time', '23:59')))
    return jsonify(tasks)

# POST new task
@app.route("/api/tasks", methods=["POST"])
def create_task():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('name'):
            return jsonify({"error": "Task name is required"}), 400
            
        # Create new task
        new_task = {
            "id": str(uuid.uuid4()),
            "name": data['name'],
            "description": data.get('description', ''),
            "due_date": data.get('due_date', ''),
            "due_time": data.get('due_time', ''),
            "completed": False,
            "created_at": datetime.now().isoformat()
        }
        
        # Load existing tasks and add new one
        tasks = load_tasks()
        tasks.append(new_task)
        save_tasks(tasks)
        
        return jsonify(new_task), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# PUT update task
@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    try:
        data = request.get_json()
        tasks = load_tasks()
        
        # Find task by ID
        task_index = None
        for i, task in enumerate(tasks):
            if task['id'] == task_id:
                task_index = i
                break
                
        if task_index is None:
            return jsonify({"error": "Task not found"}), 404
            
        # Update task fields
        if 'name' in data:
            tasks[task_index]['name'] = data['name']
        if 'description' in data:
            tasks[task_index]['description'] = data['description']
        if 'due_date' in data:
            tasks[task_index]['due_date'] = data['due_date']
        if 'due_time' in data:
            tasks[task_index]['due_time'] = data['due_time']
        if 'completed' in data:
            tasks[task_index]['completed'] = data['completed']
            
        tasks[task_index]['updated_at'] = datetime.now().isoformat()
        
        save_tasks(tasks)
        return jsonify(tasks[task_index])
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE task
@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    try:
        tasks = load_tasks()
        
        # Find and remove task
        tasks = [task for task in tasks if task['id'] != task_id]
        save_tasks(tasks)
        
        return jsonify({"message": "Task deleted successfully"})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    init_tasks_file()
    app.run(debug=True)