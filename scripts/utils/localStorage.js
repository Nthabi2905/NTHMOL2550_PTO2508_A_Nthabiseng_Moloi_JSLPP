const STORAGE_KEY = "kanban_tasks";

/**
 * Save tasks to localStorage.
 * @param {Array} tasks
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage.
 * @returns {Array}
 */
export function loadTasksFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
