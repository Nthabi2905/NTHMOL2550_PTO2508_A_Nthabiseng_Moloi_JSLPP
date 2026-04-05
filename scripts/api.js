export async function fetchTasksFromAPI() {
  try {
    const res = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
