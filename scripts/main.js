import { fetchTasksFromAPI } from "./api.js";
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";

async function initTaskBoard() {
  try {
    showLoading();

    let tasks = loadTasksFromStorage();

    // If no tasks in storage → fetch from API
    if (!tasks.length) {
      tasks = await fetchTasksFromAPI();
      saveTasksToStorage(tasks);
    }

    clearExistingTasks();
    renderTasks(tasks);
    removeLoading();
  } catch (error) {
    showError("Failed to load tasks. Please try again.");
  }

  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
