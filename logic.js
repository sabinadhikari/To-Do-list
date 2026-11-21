
const inputTask = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const listOfTask = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const filterButtons = document.querySelectorAll(".filter-btn");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editingTask = null;
let currentFilter = "all";

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task statistics
function updateStats() {
    totalTasks.textContent = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    });

    completedTasks.textContent = completed.length;
    pendingTasks.textContent = tasks.length - completed.length;
}

// Display tasks
function displayTasks() {
    listOfTask.innerHTML = "";

    tasks.forEach(function(task, index) {

        let newTask = document.createElement("div");
        newTask.className = "task-item";

        if (task.completed) {
            newTask.classList.add("completed");
        }

        // Task content
        let taskContent = document.createElement("div");
        taskContent.className = "task-content";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let taskText = document.createElement("span");
        taskText.textContent = task.text;

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);

        newTask.appendChild(taskContent);

        // Button group
        let buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        newTask.appendChild(buttonGroup);

        // Complete / Uncomplete task
        checkbox.onchange = function() {
            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        };

        // Delete task
        deleteBtn.onclick = function() {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        };

        // Edit task
        editBtn.onclick = function() {
            inputTask.value = task.text;
            addTaskButton.textContent = "Update";

            editingTask = index;
            inputTask.focus();
        };

        // Apply current filter
        if (currentFilter === "all") {
            newTask.style.display = "flex";
        } else if (currentFilter === "pending") {
            newTask.style.display = task.completed ? "none" : "flex";
        } else if (currentFilter === "completed") {
            newTask.style.display = task.completed ? "flex" : "none";
        }

        listOfTask.appendChild(newTask);
    });

    updateStats();
}

// Add / Update task
function taskButton() {
    let taskThings = inputTask.value.trim();

    if (taskThings === "") {
        alert("Enter the Task!");
        return;
    }

    // Update existing task
    if (editingTask !== null) {
        tasks[editingTask].text = taskThings;
        editingTask = null;

        addTaskButton.textContent = "Add Task";
    } else {
        // Add new task
        tasks.push({
            text: taskThings,
            completed: false
        });
    }

    inputTask.value = "";

    saveTasks();
    displayTasks();
}

// Filter buttons
filterButtons.forEach(function(button) {

    button.onclick = function() {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    };

});

// Add button event
// Add / Update task using Enter key
inputTask.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        taskButton();
    }
});

// Initial display: restore saved tasks
displayTasks();
