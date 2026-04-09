import { getTasks } from "./utils/localStorage.js";
import { renderTasks } from "./ui/render.js";

document.addEventListener("DOMContentLoaded", async () => {
  const tasks = await getTasks();
  renderTasks(tasks);

  // Theme Toggle Logic
  const themeBtn = document.createElement("button");
  themeBtn.id = "theme-toggle";
  themeBtn.textContent = "Toggle Dark Mode";
  document.querySelector(".side-bar").appendChild(themeBtn);

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Check saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
});
