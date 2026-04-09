/**
 * Sets up the new task modal event handlers
 * @param {Function} onTaskCreate - Callback function when a task is created
 */
export function setupNewTaskModalHandler(onTaskCreate) {
  const modal = document.querySelector(".modal-overlay");
  const addBtn = document.getElementById("add-new-task-btn");
  const cancelBtn = document.getElementById("cancel-add-btn");
  const form = document.getElementById("new-task-modal-window");

  // Open modal
  addBtn.addEventListener("click", () => {
    modal.showModal();
  });

  // Close modal
  cancelBtn.addEventListener("click", () => {
    modal.close();
    resetForm();
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title-input").value;
    const description = document.getElementById("desc-input").value;
    const status = document.getElementById("select-status").value;
    const priority =
      document.getElementById("priority-select")?.value || "medium";

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      board: "Launch Career",
    };

    onTaskCreate(newTask);
    modal.close();
    resetForm();
  });
}

/**
 * Shows the edit task modal with task details
 * @param {Object} task - Task object to edit
 * @param {Function} onSave - Callback when task is saved
 * @param {Function} onDelete - Callback when task is deleted
 */
export function showEditTaskModal(task, onSave, onDelete) {
  const modal = document.getElementById("task-modal");
  const form = document.getElementById("task-form");

  // Populate form with task data
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;

  // Add priority selector if not exists
  addPriorityToEditModal(task);

  // Show modal
  modal.showModal();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title: document.getElementById("task-title").value,
      description: document.getElementById("task-desc").value,
      status: document.getElementById("task-status").value,
      priority:
        document.getElementById("edit-priority-select")?.value || task.priority,
    };

    onSave(updatedTask);
    modal.close();
    cleanup();
  };

  // Handle delete
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      modal.close();
      cleanup();
    }
  };

  // Add delete button if not exists
  let deleteBtn = document.getElementById("delete-task-btn");
  if (!deleteBtn) {
    deleteBtn = document.createElement("button");
    deleteBtn.id = "delete-task-btn";
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete Task";
    deleteBtn.style.backgroundColor = "#ea5555";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "30px";
    deleteBtn.style.padding = "14px";
    deleteBtn.style.fontSize = "16px";
    deleteBtn.style.fontWeight = "600";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginTop = "12px";

    const buttonGroup =
      document.querySelector("#task-form .button-group") || form;
    buttonGroup.appendChild(deleteBtn);
  }

  const cleanup = () => {
    form.removeEventListener("submit", handleSubmit);
    deleteBtn.removeEventListener("click", handleDelete);
    form
      .querySelector("#cancel-edit-btn")
      ?.removeEventListener("click", closeHandler);
  };

  const closeHandler = () => {
    modal.close();
    cleanup();
  };

  // Add cancel button if not exists
  let cancelBtn = document.getElementById("cancel-edit-btn");
  if (!cancelBtn) {
    cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-edit-btn";
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.backgroundColor = "#e4ebfa";
    cancelBtn.style.color = "#635fc7";
    cancelBtn.style.border = "none";
    cancelBtn.style.borderRadius = "30px";
    cancelBtn.style.padding = "14px";
    cancelBtn.style.fontSize = "16px";
    cancelBtn.style.fontWeight = "600";
    cancelBtn.style.cursor = "pointer";
    cancelBtn.style.marginRight = "10px";

    const buttonGroup =
      document.querySelector("#task-form .button-group") || form;
    buttonGroup.insertBefore(cancelBtn, deleteBtn);
  }

  form.addEventListener("submit", handleSubmit);
  deleteBtn.addEventListener("click", handleDelete);
  cancelBtn.addEventListener("click", closeHandler);

  const closeModalBtn = document.getElementById("close-modal-btn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeHandler);
  }
}

/**
 * Adds priority selector to edit modal
 * @param {Object} task - Current task object
 */
function addPriorityToEditModal(task) {
  let prioritySelect = document.getElementById("edit-priority-select");

  if (!prioritySelect) {
    const statusLabel =
      document.querySelector("#task-status")?.closest("div") ||
      document.querySelector("#task-status")?.parentElement;

    const priorityDiv = document.createElement("div");
    priorityDiv.innerHTML = `
            <label for="edit-priority-select">Priority</label>
            <select id="edit-priority-select" required>
                <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
                <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
                <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
            </select>
        `;

    if (statusLabel && statusLabel.parentNode) {
      statusLabel.parentNode.insertBefore(priorityDiv, statusLabel.nextSibling);
    }
  } else {
    prioritySelect.value = task.priority || "medium";
  }
}

/**
 * Resets the new task form to default values
 */
function resetForm() {
  document.getElementById("title-input").value = "";
  document.getElementById("desc-input").value = "";
  document.getElementById("select-status").value = "todo";
  if (document.getElementById("priority-select")) {
    document.getElementById("priority-select").value = "medium";
  }
}
