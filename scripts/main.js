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
 * Set up desktop hide/show sidebar buttons
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const currentTheme = document.body.classList.contains("dark")
      ? "dark"
      : "light";

    localStorage.setItem("theme", currentTheme);
  });
}

/**
 * Set up theme toggle if the button exists
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light",
      );
    });
  }
}

/**
 * Initialise task board
 */
async function initTaskBoard() {
  try {
    loadingEl.style.display = "block";

    let tasks = loadTasksFromStorage();

    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasksToStorage(tasks);
    }

    clearExistingTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error(error);
    errorEl.style.display = "block";
  } finally {
    loadingEl.style.display = "none";
  }

  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupSidebarToggle();
  setupThemeToggle();
  setupThemeToggle();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
