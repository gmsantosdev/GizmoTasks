import { confirmModal } from "./modal.js";
import { removeTask, getTaskById } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", deleteTask);

const viewDeleteButton = document.querySelector("#view-delete-button");
viewDeleteButton.addEventListener("click", deleteTask);

async function deleteTask(event) {
    event.preventDefault();
    const task = getTaskById(id);

    const confirm = await confirmModal("Delete task?", "Are you sure you want to delete this task?");
    if (confirm) {
        removeTask(task);
        window.location.href = 'index.html';
    }
}