import { createTask } from "./task.js";
import { getPreferences, getTaskById, updateTask } from "./storage.js";
import { formatDate, updateStatusUI } from "./ui.js";
import { showModal } from "./modal.js";


const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const form = document.querySelector("#details");
form.addEventListener("submit", completeTask);

const viewComplete = document.querySelector("#view-complete-button");
viewComplete.addEventListener("click", completeTask);

function completeTask(event) {
    event.preventDefault();

    try {
        if (event.submitter.value !== "complete") {
            return;
        }
    } catch (error) {
    }

    const task = getTaskById(id);

    const {
        name,
        summary,
        category,
        progress,
        dueAt,
        createdAt,
    } = task;

    let {
        status,
        completedAt,
        updatedAt
    } = task;
    
    const now = new Date();

    if (status === "active") {
        status = "completed";
        completedAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
        updatedAt = null;
    } else {
        status = "active";
        completedAt = null;
        updatedAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    }   

    const updatedTask = createTask(id, name, summary, category, progress, status, dueAt, createdAt, updatedAt, completedAt);
    
    updateTask(updatedTask);
    if (status === "completed") {
        showModal("Task complete!", "This task is marked as complete.");
    } else if (status === "active") {
        showModal("Active Task!", "This task is marked as active.");
    }
    
    updateStatusUI(updatedTask, getPreferences().dateFormat, getPreferences().timeFormat);
}