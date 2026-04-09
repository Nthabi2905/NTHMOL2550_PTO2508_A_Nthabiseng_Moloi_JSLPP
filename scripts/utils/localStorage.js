/**
 * Loads tasks from localStorage
 * @returns {Array<Object>}
 */
export function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing tasks from localStorage:", err);
      return [];
    }
  }

  return []; // No hardcoded fallback
}

/**
 * Saves tasks to localStorage
 * @param {Array<Object>} tasks
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
