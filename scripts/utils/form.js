/**
 * @module formUtils
 * @description Utility functions for resetting and reading form fields
 * in the new task modal.
 */

/**
 * Resets all input fields in the new task creation form.
 * Should be called after a task is successfully created.
 */
export function resetForm() {
  const titleInput = document.getElementById("title-input");
  const descInput = document.getElementById("desc-input");
  const statusSelect = document.getElementById("select-status");

  if (titleInput) titleInput.value = "";
  if (descInput) descInput.value = "";
  if (statusSelect) statusSelect.value = "todo";
}

/**
 * Reads and returns the current values from the new task form fields.
 * @returns {{ title: string, description: string, status: string }}
 */
export function getFormValues() {
  return {
    title: document.getElementById("title-input")?.value.trim() || "",
    description: document.getElementById("desc-input")?.value.trim() || "",
    status: document.getElementById("select-status")?.value || "todo",
  };
}
