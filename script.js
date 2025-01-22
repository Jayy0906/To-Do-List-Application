// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const errorMsg = document.getElementById("errorMsg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on load
window.onload = renderTasks;

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText || tasks.some(task => task.text === taskText)) {
    errorMsg.classList.remove("d-none");
    return;
  }
  errorMsg.classList.add("d-none");

  const task = { text: taskText, completed: false, priority: "low" };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task, index) => `
      <li class="list-group-item ${task.completed ? "completed" : ""} ${task.priority}">
        <span>${task.text}</span>
        <div>
          <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
            <i class="fas fa-trash"></i>
          </button>
          <input type="checkbox" class="form-check-input ms-3" onchange="toggleComplete(${index})" ${
            task.completed ? "checked" : ""
          }>
        </div>
      </li>
    `
    )
    .join("");
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText && !tasks.some(task => task.text === newText)) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
