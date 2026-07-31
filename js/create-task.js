import { createTask } from "./task.js";
import { saveTask, generateId } from "./storage.js";
import { setMinDate, setMinTime } from "./date-utils.js";

const dateInput = document.querySelector("#task-date");
setMinTime(dateInput);
dateInput.addEventListener("input", handleDate);

setMinDate();

function handleDate() {
    setMinTime(dateInput);
}

const form = document.querySelector("#create");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#task-name").value;
    const summaryInput = document.querySelector("#task-summary").value;
    const categoryInput = document.querySelector("#task-category").value;
    const timeInput = document.querySelector("#task-time").value;
    const rangeInput = document.querySelector("#task-range").value;

    let dueAt;
    if (!timeInput) {
        dueAt = dateInput.value;
    } else {
        dueAt = dateInput.value + "T" + timeInput;
    }
    const now = new Date();
    const createdAt = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + "T" + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    const id = generateId();

    saveTask(createTask(id, nameInput, summaryInput, categoryInput, rangeInput, "active", dueAt, createdAt, null, null));
    form.reset();
    setMinTime(dateInput);
    alert("Task created successfully!");
}
