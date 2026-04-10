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
 * and mobile sidebar toggle.
 */
function setupSidebarToggle() {
  const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
  const showSidebarBtn = document.getElementById("show-sidebar-btn");
  const mobileToggleBtn = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("side-bar-div");

  if (hideSidebarBtn && showSidebarBtn) {
    hideSidebarBtn.addEventListener("click", () => {
      document.body.classList.add("sidebar-hidden");
      localStorage.setItem("kanbanSidebar", "hidden");
    });

    showSidebarBtn.addEventListener("click", () => {
      document.body.classList.remove("sidebar-hidden");
      localStorage.setItem("kanbanSidebar", "shown");
    });

    const savedSidebarState = localStorage.getItem("kanbanSidebar");
    if (savedSidebarState === "hidden") {
      document.body.classList.add("sidebar-hidden");
    }
  }

  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      sidebar.classList.toggle("show-sidebar");
    });

    document.addEventListener("click", (event) => {
      const clickedInsideSidebar = sidebar.contains(event.target);
      const clickedToggle = mobileToggleBtn.contains(event.target);

      if (!clickedInsideSidebar && !clickedToggle) {
        sidebar.classList.remove("show-sidebar");
      }
    });
  }
}

/**
 * Set up light/dark theme toggle.
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
 * Initialise task board.
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
    console.error("Failed to initialise task board:", error);
    errorEl.style.display = "block";
  } finally {
    loadingEl.style.display = "none";
  }

  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupSidebarToggle();
  setupThemeToggle();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
