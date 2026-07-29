import { removeTask, getTaskById } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const form = document.querySelector("#details");
form.addEventListener("submit", deleteTask);

function deleteTask(event) {
    event.preventDefault();

    if (event.submitter.value !== "delete") {
        return;
    }

    const task = getTaskById(id);

    removeTask(task);
    alert("Task deleted successfully");
    window.location.href = 'index.html';
}