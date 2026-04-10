import { createTaskElement } from "./taskElement.js";

/**
 * Clear all task containers.
 */
export function clearExistingTasks() {
  const taskContainers = document.querySelectorAll(".tasks-container");
  taskContainers.forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Update the column counts.
 * @param {Array} tasks
 */
function updateColumnCounts(tasks) {
  const todoCount = tasks.filter((task) => task.status === "todo").length;
  const doingCount = tasks.filter((task) => task.status === "doing").length;
  const doneCount = tasks.filter((task) => task.status === "done").length;

  const todoHeading = document.getElementById("toDoText");
  const doingHeading = document.getElementById("doingText");
  const doneHeading = document.getElementById("doneText");

  if (todoHeading) todoHeading.textContent = `TODO (${todoCount})`;
  if (doingHeading) doingHeading.textContent = `DOING (${doingCount})`;
  if (doneHeading) doneHeading.textContent = `DONE (${doneCount})`;
}

/**
 * Render tasks into the correct columns.
 * @param {Array} tasks
 */
export function renderTasks(tasks) {
  clearExistingTasks();

  tasks.forEach((task) => {
    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`,
    );

    if (!column) return;

    const taskElement = createTaskElement(task);
    column.appendChild(taskElement);
  });

  updateColumnCounts(tasks);
}
