import { openTaskModal } from "./modalHandlers.js";

/**
 * Create one task card element.
 * @param {Object} task
 * @returns {HTMLDivElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.textContent = task.title;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}
