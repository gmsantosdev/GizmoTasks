import { removeTask, getTaskById } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", deleteTask);

function deleteTask() {
    const task = getTaskById(id);

    removeTask(task);
    alert("Task deleted successfully");
    window.location.href = 'index.html';
}