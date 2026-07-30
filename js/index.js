import { getTasks } from "./storage.js";
import { renderTasks, clearTasks } from "./ui.js";
import { searchTasks } from "./taskService.js";

const searchInput = document.querySelector("#search-text");
searchInput.addEventListener("input", handleSearch);

renderTasks(getTasks());

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-text").value;
    const newTasks = searchTasks(searchInput);

    clearTasks();
    renderTasks(newTasks);
}