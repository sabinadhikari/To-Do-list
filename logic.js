const inputTask = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const listOfTask = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const filterButton = document.querySelectorAll(".filters-btn");

function taskButton() {
  let taskThings = inputTask.value.trim(); // trim - avoid unnecessary spaces in input field.

  // to avoid entering empty taks
  if (taskThings === "") {
    alert("Enter the Task!");
    return;
  }


  //edit
  if (editingTask !== null) {
    editingTask.querySelector("span").textContent = taskThings;
    editingTask = null;


      //reset update to edit
    inputTask.value = "";
    addTaskButton.textContent = "Add Task";

    return;
  }

  let newTask = document.createElement("div");
  // newTask.textContent = taskThings;

  inputTask.value = ""; // Clears the input field after adding the task.

  newTask.className = "task-item";

  let allNewTask = document.createElement("div");
  allNewTask.className = "task-content";
  newTask.appendChild(allNewTask);

  let inputHere = document.createElement("input");
  inputHere.type = "checkbox";
  allNewTask.appendChild(inputHere);

  let taskText = document.createElement("span");
  taskText.textContent = taskThings;
  allNewTask.appendChild(taskText);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  newTask.appendChild(deleteBtn);

  let editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  newTask.appendChild(editBtn);

  let buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(deleteBtn);

  newTask.appendChild(buttonGroup);

  listOfTask.appendChild(newTask); // Add task to the taskList container

  deleteBtn.onclick = function () {
    newTask.remove();

    updateStats();
  };

  inputHere.onchange = function () {
    if (inputHere.checked) {
      newTask.classList.add("completed");
    } else {
      newTask.classList.remove("completed");
    }

    updateStats();


  };
  updateStats();



    // Edit button
  editBtn.onclick = function () {
    inputTask.value = taskText.textContent;
      addTaskButton.textContent = "Update"

    editingTask = newTask;
  };
}
let editingTask = null;


// Number update
function updateStats() {
  let allTasks = document.querySelectorAll(".task-item");
  totalTasks.textContent = allTasks.length;

  let completed = document.querySelectorAll(".task-item.completed");
  completedTasks.textContent = completed.length;

  pendingTasks.textContent = allTasks.length - completed.length;
}

addTaskButton.onclick = taskButton;
