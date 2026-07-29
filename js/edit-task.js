import { createTask } from "./task.js";
import { updateTask, getTaskById } from "./storage.js";
import { renderTaskDetails } from "./ui.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const saveButton = document.querySelector("#confirm-button");
saveButton.addEventListener("click", saveTaskChanges);

function saveTaskChanges(event) {
    event.preventDefault()

    const task = getTaskById(id);

    const {
        name,
        status,
        createdAt,
        completedAt,
    } = task;

    const summaryInput = document.querySelector("#task-summary").value;
    const categoryInput = document.querySelector("#task-category").value;
    const dateInput = document.querySelector("#task-date").value;
    const timeInput = document.querySelector("#task-time").value;
    const rangeInput = document.querySelector("#task-range").value;

    const dueAt = dateInput + "T" + timeInput;
    const now = new Date();
    const updatedAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");

    updateTask(createTask(id, name, summaryInput, categoryInput, rangeInput, status, dueAt, createdAt, updatedAt, completedAt))
    alert("Task updated successfully!");
    location.reload();
}