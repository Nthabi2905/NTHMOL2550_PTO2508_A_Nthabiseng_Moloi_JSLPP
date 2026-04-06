export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const toggleBtn = document.getElementById("toggle-sidebar-btn");

  // Mobile open
  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
    });

    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("side-bar-div");

      if (
        sidebar.classList.contains("show-sidebar") &&
        !sidebar.contains(e.target) &&
        !e.target.closest("#mobile-menu-btn")
      ) {
        sidebar.classList.remove("show-sidebar");
      }
    });
  }

  // Desktop toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
}
