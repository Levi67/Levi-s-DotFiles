// Clock functionality
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Weather API using wttr.in
async function fetchWeather() {
    try {
        // Get user's location first, then fetch weather
        // You can replace 'Brussels' with any city or use geolocation
        const location = 'Brussels'; // Change this to your preferred location
        const response = await fetch(`https://wttr.in/${location}?format=j1`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract current weather data
        const current = data.current_condition[0];
        const location_name = data.nearest_area[0].areaName[0].value;
        const country = data.nearest_area[0].country[0].value;
        
        // Map weather codes to emojis
        const weatherEmojis = {
            '113': '☀️', // Sunny
            '116': '⛅', // Partly cloudy
            '119': '☁️', // Cloudy
            '122': '☁️', // Overcast
            '143': '🌫️', // Mist
            '176': '🌦️', // Patchy rain possible
            '179': '🌨️', // Patchy snow possible
            '182': '🌧️', // Patchy sleet possible
            '185': '🌧️', // Patchy freezing drizzle possible
            '200': '⛈️', // Thundery outbreaks possible
            '227': '🌨️', // Blowing snow
            '230': '❄️', // Blizzard
            '248': '🌫️', // Fog
            '260': '🌫️', // Freezing fog
            '263': '🌦️', // Patchy light drizzle
            '266': '🌧️', // Light drizzle
            '281': '🌧️', // Freezing drizzle
            '284': '🌧️', // Heavy freezing drizzle
            '293': '🌦️', // Patchy light rain
            '296': '🌧️', // Light rain
            '299': '🌧️', // Moderate rain at times
            '302': '🌧️', // Moderate rain
            '305': '🌧️', // Heavy rain at times
            '308': '🌧️', // Heavy rain
            '311': '🌧️', // Light freezing rain
            '314': '🌧️', // Moderate or heavy freezing rain
            '317': '🌧️', // Light sleet
            '320': '🌧️', // Moderate or heavy sleet
            '323': '🌨️', // Patchy light snow
            '326': '🌨️', // Light snow
            '329': '🌨️', // Patchy moderate snow
            '332': '🌨️', // Moderate snow
            '335': '🌨️', // Patchy heavy snow
            '338': '❄️', // Heavy snow
            '350': '🌧️', // Ice pellets
            '353': '🌦️', // Light rain shower
            '356': '🌧️', // Moderate or heavy rain shower
            '359': '🌧️', // Torrential rain shower
            '362': '🌧️', // Light sleet showers
            '365': '🌧️', // Moderate or heavy sleet showers
            '368': '🌨️', // Light snow showers
            '371': '🌨️', // Moderate or heavy snow showers
            '374': '🌧️', // Light showers of ice pellets
            '377': '🌧️', // Moderate or heavy showers of ice pellets
            '386': '⛈️', // Patchy light rain with thunder
            '389': '⛈️', // Moderate or heavy rain with thunder
            '392': '⛈️', // Patchy light snow with thunder
            '395': '⛈️'  // Moderate or heavy snow with thunder
        };
        
        const weatherCode = current.weatherCode;
        const weatherIcon = weatherEmojis[weatherCode] || '🌤️';
        
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <div class="weather-icon">${weatherIcon}</div>
            <div class="weather-info">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">${location_name}, ${country}</div>
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${current.temp_C}°C</div>
                <div style="opacity: 0.8;">${current.weatherDesc[0].value}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.7;">
                    Feels like ${current.FeelsLikeC}°C • ${current.humidity}% humidity
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather').innerHTML = `
            <div class="weather-icon">❌</div>
            <div class="weather-info">
                <div>Unable to load weather</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">Check your connection</div>
            </div>
        `;
    }
}

async function fetchPins() {
    try {
        // Replace this with: const res = await fetch('/api/pins');
        // For now, using mock data
        const data = [
            {"name": "YouTube", "url": "https://youtube.com", "icon": "🎥"},
            {"name": "GitHub", "url": "https://github.com", "icon": "🐙"},
            {"name": "Reddit", "url": "https://reddit.com", "icon": "👽"},
            {"name": "Netflix", "url": "https://netflix.com", "icon": "🎬"}
        ];
        
        const pinsDiv = document.getElementById('pins');
        pinsDiv.innerHTML = '';
        data.forEach(pin => {
            const a = document.createElement('a');
            a.className = 'pin';
            a.href = pin.url;
            a.target = '_blank';
            a.textContent = `${pin.icon} ${pin.name}`;
            pinsDiv.appendChild(a);
        });
    } catch (error) {
        console.error('Error fetching pins:', error);
        document.getElementById('pins').innerHTML = '<div>Error loading pins</div>';
    }
}

// Task Management Functions
async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        
        const tasksUl = document.getElementById('tasks');
        
        if (tasks.length === 0) {
            tasksUl.innerHTML = '<li class="task">No tasks yet. Click "Add Task" to get started!</li>';
            return;
        }
        
        tasksUl.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task ${task.completed ? 'completed-task' : ''}`;
            
            // Format due date/time
            let dueDateStr = '';
            if (task.due_date) {
                const dueDate = new Date(task.due_date + (task.due_time ? 'T' + task.due_time : ''));
                const now = new Date();
                const isOverdue = dueDate < now && !task.completed;
                
                dueDateStr = `
                    <div class="task-due ${isOverdue ? 'task-overdue' : ''}">
                        Due: ${formatDateTime(dueDate)}
                        ${isOverdue ? ' (Overdue!)' : ''}
                    </div>
                `;
            }
            
            li.innerHTML = `
                <div class="task-content">
                    <div class="task-info">
                        <div class="task-name">${task.name}</div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                        ${dueDateStr}
                    </div>
                    <div class="task-actions">
                        <button class="task-btn" onclick="toggleTaskCompletion('${task.id}', ${!task.completed})">
                            ${task.completed ? '↶' : '✓'}
                        </button>
                        <button class="task-btn" onclick="editTask('${task.id}')">✎</button>
                        <button class="task-btn delete-btn" onclick="deleteTask('${task.id}')">✕</button>
                    </div>
                </div>
            `;
            tasksUl.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        document.getElementById('tasks').innerHTML = '<li class="task">Error loading tasks. Please check your server.</li>';
    }
}

// Format date and time for display
function formatDateTime(date) {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === new Date(today.getTime() + 24*60*60*1000).toDateString();
    
    let dateStr = '';
    if (isToday) dateStr = 'Today';
    else if (isTomorrow) dateStr = 'Tomorrow';
    else dateStr = date.toLocaleDateString();
    
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} at ${timeStr}`;
}

// Create new task
async function createTask(taskData) {
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await fetchTasks(); // Refresh tasks list
        return true;
    } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
        return false;
    }
}

// Toggle task completion
async function toggleTaskCompletion(taskId, completed) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await fetchTasks(); // Refresh tasks list
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await fetchTasks(); // Refresh tasks list
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}

// Edit task (simplified - just toggle completion for now, can be expanded)
async function editTask(taskId) {
    // For now, just show an alert. You can expand this to show an edit form
    alert('Edit functionality can be expanded here. For now, you can mark as complete/incomplete or delete.');
}

// Task form handling
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskForm = document.getElementById('taskForm');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const cancelTaskBtn = document.getElementById('cancelTaskBtn');
    
    // Show task form
    addTaskBtn.addEventListener('click', () => {
        taskForm.style.display = 'block';
        addTaskBtn.style.display = 'none';
        document.getElementById('taskName').focus();
    });
    
    // Hide task form
    cancelTaskBtn.addEventListener('click', () => {
        taskForm.style.display = 'none';
        addTaskBtn.style.display = 'block';
        clearTaskForm();
    });
    
    // Save new task
    saveTaskBtn.addEventListener('click', async () => {
        const name = document.getElementById('taskName').value.trim();
        if (!name) {// Clock functionality
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Weather API using wttr.in
async function fetchWeather() {
    try {
        // Get user's location first, then fetch weather
        // You can replace 'Brussels' with any city or use geolocation
        const location = 'ruhpolding'; // Change this to your preferred location
        const response = await fetch(`https://wttr.in/${location}?format=j1`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract current weather data
        const current = data.current_condition[0];
        const location_name = data.nearest_area[0].areaName[0].value;
        const country = data.nearest_area[0].country[0].value;
        
        // Map weather codes to emojis
        const weatherEmojis = {
            '113': '☀️', // Sunny
            '116': '⛅', // Partly cloudy
            '119': '☁️', // Cloudy
            '122': '☁️', // Overcast
            '143': '🌫️', // Mist
            '176': '🌦️', // Patchy rain possible
            '179': '🌨️', // Patchy snow possible
            '182': '🌧️', // Patchy sleet possible
            '185': '🌧️', // Patchy freezing drizzle possible
            '200': '⛈️', // Thundery outbreaks possible
            '227': '🌨️', // Blowing snow
            '230': '❄️', // Blizzard
            '248': '🌫️', // Fog
            '260': '🌫️', // Freezing fog
            '263': '🌦️', // Patchy light drizzle
            '266': '🌧️', // Light drizzle
            '281': '🌧️', // Freezing drizzle
            '284': '🌧️', // Heavy freezing drizzle
            '293': '🌦️', // Patchy light rain
            '296': '🌧️', // Light rain
            '299': '🌧️', // Moderate rain at times
            '302': '🌧️', // Moderate rain
            '305': '🌧️', // Heavy rain at times
            '308': '🌧️', // Heavy rain
            '311': '🌧️', // Light freezing rain
            '314': '🌧️', // Moderate or heavy freezing rain
            '317': '🌧️', // Light sleet
            '320': '🌧️', // Moderate or heavy sleet
            '323': '🌨️', // Patchy light snow
            '326': '🌨️', // Light snow
            '329': '🌨️', // Patchy moderate snow
            '332': '🌨️', // Moderate snow
            '335': '🌨️', // Patchy heavy snow
            '338': '❄️', // Heavy snow
            '350': '🌧️', // Ice pellets
            '353': '🌦️', // Light rain shower
            '356': '🌧️', // Moderate or heavy rain shower
            '359': '🌧️', // Torrential rain shower
            '362': '🌧️', // Light sleet showers
            '365': '🌧️', // Moderate or heavy sleet showers
            '368': '🌨️', // Light snow showers
            '371': '🌨️', // Moderate or heavy snow showers
            '374': '🌧️', // Light showers of ice pellets
            '377': '🌧️', // Moderate or heavy showers of ice pellets
            '386': '⛈️', // Patchy light rain with thunder
            '389': '⛈️', // Moderate or heavy rain with thunder
            '392': '⛈️', // Patchy light snow with thunder
            '395': '⛈️'  // Moderate or heavy snow with thunder
        };
        
        const weatherCode = current.weatherCode;
        const weatherIcon = weatherEmojis[weatherCode] || '🌤️';
        
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <div class="weather-icon">${weatherIcon}</div>
            <div class="weather-info">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">${location_name}, ${country}</div>
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${current.temp_C}°C</div>
                <div style="opacity: 0.8;">${current.weatherDesc[0].value}</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.7;">
                    Feels like ${current.FeelsLikeC}°C • ${current.humidity}% humidity
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather').innerHTML = `
            <div class="weather-icon">❌</div>
            <div class="weather-info">
                <div>Unable to load weather</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">Check your connection</div>
            </div>
        `;
    }
}

async function fetchPins() {
    try {
        // Replace this with: const res = await fetch('/api/pins');
        // For now, using mock data
        const data = [
            {"name": "YouTube", "url": "https://youtube.com", "icon": "🎥"},
            {"name": "GitHub", "url": "https://github.com", "icon": "🐙"},
            {"name": "Reddit", "url": "https://reddit.com", "icon": "👽"},
            {"name": "Netflix", "url": "https://netflix.com", "icon": "🎬"}
        ];
        
        const pinsDiv = document.getElementById('pins');
        pinsDiv.innerHTML = '';
        data.forEach(pin => {
            const a = document.createElement('a');
            a.className = 'pin';
            a.href = pin.url;
            a.target = '_blank';
            a.textContent = `${pin.icon} ${pin.name}`;
            pinsDiv.appendChild(a);
        });
    } catch (error) {
        console.error('Error fetching pins:', error);
        document.getElementById('pins').innerHTML = '<div>Error loading pins</div>';
    }
}

async function fetchTasks() {
    try {
        // Replace this with: const res = await fetch('/api/tasks');
        // For now, using mock data
        const data = [
            {"task": "Finish rice dynamic island", "due": "2025-08-10"},
            {"task": "Update WireGuard config", "due": "2025-08-12"},
            {"task": "Test notification manager", "due": null},
            {"task": "Review code changes", "due": "2025-08-09"}
        ];
        
        const tasksUl = document.getElementById('tasks');
        tasksUl.innerHTML = '';
        data.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = task.due 
                ? `${task.task}<span class="task-due">(due ${task.due})</span>`
                : task.task;
            tasksUl.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        document.getElementById('tasks').innerHTML = '<li class="task">Error loading tasks</li>';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
    fetchPins();
    fetchTasks();
});
            alert('Please enter a task name.');
            return;
        }
        
        const taskData = {
            name: name,
            description: document.getElementById('taskDescription').value.trim(),
            due_date: document.getElementById('taskDate').value,
            due_time: document.getElementById('taskTime').value
        };
        
        const success = await createTask(taskData);
        if (success) {
            taskForm.style.display = 'none';
            addTaskBtn.style.display = 'block';
            clearTaskForm();
        }
    });
    
    // Clear form fields
    function clearTaskForm() {
        document.getElementById('taskName').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskTime').value = '';
    }
    
    // Initialize the page
    fetchWeather();
    fetchPins();
    fetchTasks();
});