import { saveTasksToStorage, loadTasksFromStorage } from "./localStorage.js";

/* ========================
   FETCH FROM API
======================== */
export async function fetchTasksFromAPI() {
  const response = await fetch("https://jsl-kanban-api.vercel.app/");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data.map((task, index) => ({
    id: task.id ?? index + 1,
    title: task.title ?? "Untitled Task",
    description: task.description ?? "",
    status: task.status ?? "todo",
  }));
}

/* ========================
   INIT DATA (IMPORTANT)
   API → LocalStorage fallback system
======================== */
export async function initTasks() {
  const existing = loadTasksFromStorage();

  // If localStorage already has tasks → use them
  if (existing && existing.length > 0) {
    return existing;
  }

  // Otherwise fetch from API
  const apiTasks = await fetchTasksFromAPI();

  // Save API tasks into localStorage
  saveTasksToStorage(apiTasks);

  return apiTasks;
}
