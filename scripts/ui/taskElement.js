/**
 * Creates a DOM element for a task card
 * @param {Object} task - Task object containing task details
 * @returns {HTMLElement} The task card element
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.setAttribute("data-task-id", task.id);

  // Get priority color
  const priorityColor = getPriorityColor(task.priority);

  taskDiv.innerHTML = `
        <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <strong>${escapeHtml(task.title)}</strong>
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${priorityColor};"></span>
                <span style="font-size: 10px; text-transform: uppercase; color: ${priorityColor}; font-weight: bold;">${task.priority || "medium"}</span>
            </div>
            <div style="font-size: 12px; color: var(--secondary-font-color);">
                ${task.description ? escapeHtml(task.description.substring(0, 60)) + (task.description.length > 60 ? "..." : "") : "No description"}
            </div>
        </div>
    `;

  return taskDiv;
}

/**
 * Returns color code based on priority level
 * @param {string} priority - Priority level (high, medium, low)
 * @returns {string} Color hex code
 */
function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "#ea5555";
    case "medium":
      return "#ffa500";
    case "low":
      return "#219c90";
    default:
      return "#828fa3";
  }
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
