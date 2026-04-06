export async function fetchTasksFromAPI() {
  const response = await fetch("https://jsl-kanban-api.vercel.app/");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  // 🔥 Ensure consistent structure
  return data.map((task, index) => ({
    id: task.id ?? index + 1,
    title: task.title ?? "Untitled Task",
    description: task.description ?? "",
    status: task.status ?? "todo",
  }));
}
