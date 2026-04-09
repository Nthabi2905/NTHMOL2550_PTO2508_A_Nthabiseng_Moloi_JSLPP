import { renderTasks } from "./render.js";
import { saveTasks } from "../utils/localStorage.js";

export function openEditModal(task, allTasks) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  // Pre-fill existing data
  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();

  // Handle Deletion
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Task";
  deleteBtn.className = "danger-btn"; // Ensure you add styling for this

  deleteBtn.onclick = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = allTasks.filter((t) => t.id !== task.id);
      saveTasks(updatedTasks);
      renderTasks(updatedTasks);
      modal.close();
    }
  };
}
