function showLoading() {
  const loader = document.createElement("p");
  loader.id = "loading";
  loader.textContent = "Loading tasks...";
  document.body.appendChild(loader);
}

function removeLoading() {
  const loader = document.getElementById("loading");
  if (loader) loader.remove();
}

function showError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.style.color = "red";
  document.body.appendChild(error);
}
