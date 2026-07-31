import { createTask } from "./task.js";
import { updateTask, getTaskById } from "./storage.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const form = document.querySelector("#details");
form.addEventListener("submit", saveTaskChanges);

function saveTaskChanges(event) {
    event.preventDefault()

    if (event.submitter.value !== "save") {
        return;
    }

    const task = getTaskById(id);

    const {
        status,
        createdAt,
        completedAt,
    } = task;

    const nameInput = document.querySelector("#task-name").value;
    const summaryInput = document.querySelector("#task-summary").value;
    const categoryInput = document.querySelector("#task-category").value;
    const dateInput = document.querySelector("#task-date").value;
    const timeInput = document.querySelector("#task-time").value;
    const rangeInput = document.querySelector("#task-range").value;

    if (!timeInput) {
        dueAt = dateInput;
    } else {
        dueAt = dateInput + "T" + timeInput;
    }
    
    const now = new Date();
    const updatedAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");

    updateTask(createTask(id, nameInput, summaryInput, categoryInput, rangeInput, status, dueAt, createdAt, updatedAt, completedAt))
    alert("Task updated successfully!");
    location.reload();
}