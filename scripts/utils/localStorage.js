const STORAGE_KEY = "kanban-tasks";

/**
 * Saves tasks to localStorage
 * @param {Array} tasks - Array of task objects to save
 */
export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Loads tasks from localStorage
 * @returns {Array|null} Array of task objects or null if none exist
 */
export function loadTasksFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
}

/**
 * Clears all tasks from localStorage
 */
export function clearTasksFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
