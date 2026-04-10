/**
 * Fetch tasks from API
 * @returns {Promise<Array>}
 */
export async function fetchTasksFromAPI() {
  const API_URL = "https://jsl-kanban-api.vercel.app/";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
