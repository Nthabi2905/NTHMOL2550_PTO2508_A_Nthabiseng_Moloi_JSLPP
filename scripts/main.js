import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";
import { setupSidebarToggle } from "./ui/sidebar.js";
import { setupThemeToggle } from "./ui/theme.js";

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupSidebarToggle();
  setupThemeToggle();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
