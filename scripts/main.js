import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";
import { fetchTasksFromAPI } from "./utils/api.js";

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

/**
 * Initialise task board
 */
async function initTaskBoard() {
  try {
    loadingEl.style.display = "block";

    let tasks = loadTasksFromStorage();

    // If no local data → fetch from API
    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasksToStorage(tasks);
    }

    clearExistingTasks();
    renderTasks(tasks);
  } catch (error) {
    errorEl.style.display = "block";
  } finally {
    loadingEl.style.display = "none";
  }

  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
