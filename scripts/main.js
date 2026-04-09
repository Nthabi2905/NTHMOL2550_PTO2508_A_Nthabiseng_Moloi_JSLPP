import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/localStorage.js";
import { renderTasks } from "./ui/render.js";
import { setupNewTaskModalHandler } from "./ui/modalHandlers.js";
import { fetchTasksFromAPI } from "./utils/api.js";
import {
  setupSidebarToggle,
  setupThemeToggle,
  loadThemePreference,
} from "./ui/themeSidebar.js";
import { setupTaskEventDelegation } from "./ui/taskActions.js";

// App state
let currentTasks = [];

/**
 * Initializes the Kanban application
 * Loads tasks from localStorage or API, renders them, and sets up event handlers
 */
async function init() {
  try {
    showLoadingState();

    // Try to load from localStorage first
    let tasks = loadTasksFromStorage();

    // If no tasks in localStorage, fetch from API
    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasksToStorage(tasks);
    }

    currentTasks = tasks;
    renderTasks(currentTasks);
    hideLoadingState();
  } catch (error) {
    console.error("Failed to initialize app:", error);
    showErrorMessage("Failed to load tasks. Please refresh the page.");
  }

  // Setup all event handlers
  setupNewTaskModalHandler((newTask) => addNewTask(newTask));
  setupSidebarToggle();
  setupThemeToggle();
  loadThemePreference();
  setupTaskEventDelegation(handleTaskEdit, handleTaskDelete);
}

/**
 * Adds a new task to the board
 * @param {Object} task - The new task object
 */
function addNewTask(task) {
  const tasks = loadTasksFromStorage();
  const newTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}

/**
 * Handles task editing
 * @param {Object} updatedTask - The updated task object
 */
function handleTaskEdit(updatedTask) {
  let tasks = loadTasksFromStorage();
  const index = tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  }
}

/**
 * Handles task deletion
 * @param {number} taskId - The ID of the task to delete
 */
function handleTaskDelete(taskId) {
  let tasks = loadTasksFromStorage();
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}

/**
 * Shows loading state in the UI
 */
function showLoadingState() {
  const containers = document.querySelectorAll(".tasks-container");
  containers.forEach((container) => {
    container.innerHTML = '<div class="loading-state">Loading tasks...</div>';
  });
}

/**
 * Hides loading state and clears containers
 */
function hideLoadingState() {
  const containers = document.querySelectorAll(".tasks-container");
  containers.forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Shows error message in the UI
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
  const containers = document.querySelectorAll(".tasks-container");
  containers.forEach((container) => {
    container.innerHTML = `<div class="error-state">${message}</div>`;
  });
}

// Start the application
document.addEventListener("DOMContentLoaded", init);
