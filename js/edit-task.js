import { createTask } from "./task.js";
import { updateTask, getTaskById } from "./storage.js";
import { applyPreferences } from "./preferences-ui.js";
import { confirmModal } from "./modal.js";

applyPreferences();

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const form = document.querySelector("#details");
form.addEventListener("submit", saveTaskChanges);

async function saveTaskChanges(event) {
    event.preventDefault()

    if (event.submitter.value !== "save") {
        return;
    }

    const task = getTaskById(id);

    const {
        createdAt,
        completedAt,
        status,
    } = task;

    const nameInput = document.querySelector("#task-name").value;
    const summaryInput = document.querySelector("#task-summary").value;
    const categoryInput = document.querySelector("#task-category").value;
    const dateInput = document.querySelector("#task-date").value;
    const timeInput = document.querySelector("#task-time").value;
    const rangeInput = document.querySelector("#task-range").value;

    const now = new Date();
    const updatedAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");

    let dueAt;
    if (!timeInput) {
        dueAt = dateInput;
    } else {
        dueAt = dateInput + "T" + timeInput;
    }
    
    const confirm = await confirmModal("Confirm changes?", "Are you sure you want to confirm the changes of this task?");
    if (confirm) {
        updateTask(createTask(id, nameInput, summaryInput, categoryInput, rangeInput, status, dueAt, createdAt, updatedAt, completedAt));
        location.reload();
    }
}

const editButton = document.querySelector("#edit-button");
const viewMode = document.querySelector(".view-mode");
const editMode = document.querySelector(".edit-mode");

editButton.addEventListener("click", showEditMode);

function showEditMode() {
    viewMode.style.display = "none";
    editMode.style.display = "revert";
}

const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", showViewMode);

async function showViewMode(event) {
    event.preventDefault();
    const confirmed = await confirmModal("Cancel changes?", "Are you sure you want to cancel the changes of this task?");
    
    if (confirmed) {
        location.reload();
    }
}