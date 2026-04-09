const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("dark-theme", isDark ? "enabled" : "disabled");
});

// On Load: Check preference
if (localStorage.getItem("dark-theme") === "enabled") {
  document.body.classList.add("dark-theme");
  themeSwitch.checked = true;
}
