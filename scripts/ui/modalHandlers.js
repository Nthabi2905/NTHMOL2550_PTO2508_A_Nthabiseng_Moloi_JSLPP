import { addNewTask } from "../tasks/taskManager.js";

export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.addEventListener("click", () => modal.close());
}

export function setupNewTaskModalHandler() {
  const overlay = document.querySelector(".modal-overlay");
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const form = document.querySelector(".modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  newTaskBtn.addEventListener("click", () => {
    overlay.style.visibility = "visible";
    overlay.showModal();
  });

  cancelBtn.addEventListener("click", () => overlay.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      addNewTask();
    } else {
      form.reportValidity();
    }
  });
}

export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;
  modal.showModal();
}

let currentTaskId = null;

export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");

  currentTaskId = task.id;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  modal.showModal();
}

const deleteBtn = document.getElementById("delete-task-btn");

deleteBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    // 1. Get task ID from a hidden field or global variable
    // 2. Remove from tasks array
    // 3. Update localStorage
    // 4. Re-render UI
    // 5. Close modal
  }
});
