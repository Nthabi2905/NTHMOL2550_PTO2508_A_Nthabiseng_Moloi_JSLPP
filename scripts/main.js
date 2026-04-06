async function initTaskBoard() {
  try {
    showLoading();

    let tasks = loadTasksFromStorage();

    // 🔥 If no tasks → fetch from API
    if (!tasks || tasks.length === 0) {
      const apiTasks = await fetchTasksFromAPI();
      saveTasksToStorage(apiTasks);
      tasks = apiTasks;
    }

    clearExistingTasks();
    renderTasks(tasks);

    removeLoading();
  } catch (error) {
    showError("Failed to load tasks. Please try again.");
  }

  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
