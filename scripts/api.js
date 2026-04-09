const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches tasks from the API
 * @returns {Promise<Array>} Array of task objects from the API
 * @throws {Error} If the API request fails
 */
export async function fetchTasksFromAPI() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform API data to match our task structure
    return data.map((task) => ({
      id: task.id || Date.now() + Math.random(),
      title: task.title || "Untitled Task",
      description: task.description || "",
      status: task.status || "todo",
      board: task.board || "Launch Career",
      priority: task.priority || "medium",
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
