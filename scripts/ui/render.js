import { createTaskElement } from "./taskElement.js";

/**
 * Renders tasks into their respective columns based on status
 * @param {Array} tasks - Array of task objects to render
 */
export function renderTasks(tasks) {
  // Clear all task containers
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    doing: tasks.filter((task) => task.status === "doing"),
    done: tasks.filter((task) => task.status === "done"),
  };

  // Sort tasks by priority within each status
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  Object.keys(tasksByStatus).forEach((status) => {
    tasksByStatus[status].sort((a, b) => {
      const priorityA = priorityOrder[a.priority || "medium"];
      const priorityB = priorityOrder[b.priority || "medium"];
      return priorityB - priorityA;
    });
  });

  // Render tasks to each column
  Object.entries(tasksByStatus).forEach(([status, statusTasks]) => {
    const container = document.querySelector(
      `.column-div[data-status="${status}"] .tasks-container`,
    );
    if (container) {
      statusTasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        container.appendChild(taskElement);
      });
    }
  });

  // Update column counts
  updateColumnCounts(tasksByStatus);
}

/**
 * Updates the task count display for each column
 * @param {Object} tasksByStatus - Object containing tasks grouped by status
 */
function updateColumnCounts(tasksByStatus) {
  document.getElementById("toDoText").textContent =
    `TODO (${tasksByStatus.todo.length})`;
  document.getElementById("doingText").textContent =
    `DOING (${tasksByStatus.doing.length})`;
  document.getElementById("doneText").textContent =
    `DONE (${tasksByStatus.done.length})`;
}
