/**
 * Fetches tasks from API or loads from localStorage
 * @returns {Promise<Array>} Array of task objects
 */
export async function getTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    try {
      // Fetching from the required API
      const response = await fetch("https://jsl-kanban-api.vercel.app/tasks");
      const tasks = await response.json();
      saveTasks(tasks);
      return tasks;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      return [];
    }
  }
}

/**
 * Saves tasks array to localStorage
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
