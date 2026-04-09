import { showEditTaskModal } from "./modalHandlers.js";
import { loadTasksFromStorage } from "../utils/localStorage.js";

/**
 * Sets up event delegation for task interactions (edit/delete)
 * @param {Function} onEdit - Callback for task edit
 * @param {Function} onDelete - Callback for task delete
 */
export function setupTaskEventDelegation(onEdit, onDelete) {
  const containers = document.querySelectorAll(".tasks-container");

  containers.forEach((container) => {
    container.addEventListener("click", (e) => {
      const taskDiv = e.target.closest(".task-div");
      if (!taskDiv) return;

      const taskId = parseInt(taskDiv.getAttribute("data-task-id"));
      const tasks = loadTasksFromStorage();
      const task = tasks.find((t) => t.id === taskId);

      if (task) {
        showEditTaskModal(task, onEdit, onDelete);
      }
    });
  });
}
