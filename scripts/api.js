export async function fetchTasks() {
  const response = await fetch("https://jsl-kanban-api.vercel.app/tasks");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
}
