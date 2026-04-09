import { saveTasks } from "../utils/localStorage.js";

/**
 * Clears columns and renders tasks grouped by status
 * @param {Array} tasks
 */
export function renderTasks(tasks) {
  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
  };

  // Clear existing content to prevent duplication
  Object.values(columns).forEach((col) => (col.innerHTML = ""));

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-div");
    taskElement.textContent = task.title;
    taskElement.addEventListener("click", () => openEditModal(task, tasks));

    columns[task.status]?.appendChild(taskElement);
  });
}
