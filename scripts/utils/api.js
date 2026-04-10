/**
 * Fetch tasks from the API.
 * @returns {Promise<Array>}
 */
export async function fetchTasksFromAPI() {
  const API_URL = "https://jsl-kanban-api.vercel.app/";

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks from API.");
  }

  return response.json();
}
