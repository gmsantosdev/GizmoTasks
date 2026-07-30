import { getTasks } from "./storage.js";
import { renderTasks, clearTasks } from "./ui.js";
import { searchTasks, statusTasks, categoryTasks, todayTasks } from "./taskService.js";

const searchInput = document.querySelector("#search-text");
searchInput.addEventListener("input", handleSearch);

const params = new URLSearchParams(window.location.search);
const status = params.get("status");
const category = params.get("category");
const filter = params.get("filter");

if (status === "active" && category == "important") {
    renderTasks(statusTasks(status, category));
} else if (status) {
    renderTasks(statusTasks(status));
} else if (filter == "today") {
    renderTasks(todayTasks(category));
} else if (category) {
    renderTasks(categoryTasks(category));
} else {
    renderTasks(getTasks());
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-text").value;
    const newTasks = searchTasks(searchInput);

    clearTasks();
    renderTasks(newTasks);
}