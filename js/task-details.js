import { getPreferences, getTaskById } from './storage.js';
import { renderTaskDetails, renderTaskView } from './ui.js';
import { setMaxDate, setMinDate, setMinTime } from "./date-utils.js";

const dateInput = document.querySelector("#task-date");
dateInput.addEventListener("input", handleDate);

function handleDate() {
    setMinTime(dateInput);
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));

const task = getTaskById(id);
setMinDate();
renderTaskDetails(task);
setMinTime(dateInput);
setMaxDate();
renderTaskView(getTaskById(id), getPreferences().dateFormat, getPreferences().timeFormat);