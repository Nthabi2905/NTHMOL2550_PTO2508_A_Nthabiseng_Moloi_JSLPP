function showLoading() {
  const loader = document.createElement("p");
  loader.id = "loading";
  loader.textContent = "Loading tasks...";
  loader.style.textAlign = "center";
  document.body.appendChild(loader);
}

function removeLoading() {
  const loader = document.getElementById("loading");
  if (loader) loader.remove();
}

function showError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.style.color = "red";
  error.style.textAlign = "center";
  document.body.appendChild(error);
}

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
