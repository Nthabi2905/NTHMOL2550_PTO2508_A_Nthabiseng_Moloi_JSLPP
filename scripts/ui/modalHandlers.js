import {
  saveTasksToStorage,
  loadTasksFromStorage,
} from "../utils/localStorage.js";
import { renderTasks, clearExistingTasks } from "./render.js";

let currentTaskId = null;

export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  currentTaskId = task.id;

  modal.showModal();
}

/**
 * Close modal
 */
export function setupModalCloseHandler() {
  document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("task-modal").close();
  });

  // SAVE CHANGES
  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();

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

    document.getElementById("task-modal").close();
  });
  document.getElementById("delete-task-btn").addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    let tasks = loadTasksFromStorage();

    tasks = tasks.filter((task) => task.id !== currentTaskId);

    saveTasksToStorage(tasks);

    clearExistingTasks();
    renderTasks(tasks);

    document.getElementById("task-modal").close();
  });
}

/**
 * New Task modal
 */
export function setupNewTaskModalHandler() {
  const modal = document.querySelector(".modal-overlay");

  document.getElementById("add-new-task-btn").addEventListener("click", () => {
    modal.showModal();
  });

  document.getElementById("cancel-add-btn").addEventListener("click", () => {
    modal.close();
  });

  document
    .getElementById("new-task-modal-window")
    .addEventListener("submit", (e) => {
      e.preventDefault();

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

      modal.close();
    });
}
