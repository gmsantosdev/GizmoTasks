import { getTasks } from "./storage.js";
import { renderTasks, clearTasks } from "./ui.js";
import { searchTasks, statusTasks, categoryTasks, todayTasks } from "./taskService.js";
import { applyPreferences } from "./preferences-ui.js";

applyPreferences();

const searchInput = document.querySelector("#search-text");
searchInput.addEventListener("input", handleSearch);

const params = new URLSearchParams(window.location.search);
const status = params.get("status");
const category = params.get("category");
const filter = params.get("filter");

let tasks;
if (status === "active" && category == "important") {
    tasks = statusTasks(status, category);
} else if (status) {
    tasks = statusTasks(status)
} else if (filter === "today") {
    tasks = todayTasks(category)
} else if (category) {
    tasks = categoryTasks(category);
} else {
    tasks = getTasks();
}
renderTasks(tasks);

function handleSearch(event) {
    event.preventDefault();

    const searchInput = document.querySelector("#search-text").value;
    const newTasks = searchTasks(searchInput, tasks);

    clearTasks();
    renderTasks(newTasks);
}