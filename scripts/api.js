/**
 * Fetch tasks from external API
 * @returns {Promise<Array>} Array of tasks
 */
export async function fetchTasksFromAPI() {
  const response = await fetch("https://jsl-kanban-api.vercel.app/");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data;
}
