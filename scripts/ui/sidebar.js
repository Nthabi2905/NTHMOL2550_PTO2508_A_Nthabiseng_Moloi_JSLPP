export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const toggleBtn = document.getElementById("toggle-sidebar-btn");

  // Mobile open
  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
    });
  }

  // Desktop toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
}
