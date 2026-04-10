import {
  saveTasksToStorage,
  loadTasksFromStorage,
} from "../utils/localStorage.js";
import { renderTasks, clearExistingTasks } from "./render.js";

let currentTaskId = null;

/**
 * Open task edit modal and prefill form fields.
 * @param {Object} task
 */
export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  currentTaskId = task.id;

  modal.showModal();
}

/**
 * Set up task edit modal close, save, and delete handlers.
 */
export function setupModalCloseHandler() {
  const closeBtn = document.getElementById("close-modal-btn");
  const taskForm = document.getElementById("task-form");
  const deleteBtn = document.getElementById("delete-task-btn");
  const taskModal = document.getElementById("task-modal");

  closeBtn.addEventListener("click", () => {
    taskModal.close();
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tasks = loadTasksFromStorage();

    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          title: document.getElementById("task-title").value,
          description: document.getElementById("task-desc").value,
          status: document.getElementById("task-status").value,
        };
      }
      return task;
    });

    saveTasksToStorage(updatedTasks);
    clearExistingTasks();
    renderTasks(updatedTasks);
    taskModal.close();
  });

  deleteBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    let tasks = loadTasksFromStorage();
    tasks = tasks.filter((task) => task.id !== currentTaskId);

    saveTasksToStorage(tasks);
    clearExistingTasks();
    renderTasks(tasks);
    taskModal.close();
  });
}

/**
 * Set up new task modal open, close, and create handlers.
 */
export function setupNewTaskModalHandler() {
  const modal = document.querySelector(".modal-overlay");
  const addTaskBtn = document.getElementById("add-new-task-btn");
  const cancelBtn = document.getElementById("cancel-add-btn");
  const newTaskForm = document.getElementById("new-task-modal-window");

  addTaskBtn.addEventListener("click", () => {
    modal.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    modal.close();
  });

  newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tasks = loadTasksFromStorage();

    const newTask = {
      id: Date.now(),
      title: document.getElementById("title-input").value,
      description: document.getElementById("desc-input").value,
      status: document.getElementById("select-status").value,
    };

    tasks.push(newTask);

    saveTasksToStorage(tasks);
    clearExistingTasks();
    renderTasks(tasks);

    newTaskForm.reset();
    modal.close();
  });
}
