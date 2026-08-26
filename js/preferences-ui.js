import { getPreferences, getTaskById } from "./storage.js";
import { formatDate, formatTime } from "./ui.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

export function applyPreferences() {
    const preferences = getPreferences();
    const root = document.documentElement;
    
    root.setAttribute("data-theme", preferences.theme);
    root.setAttribute("data-font-size", preferences.fontSize);

    if (id) {
        formatDate(getTaskById(id), preferences.dateFormat);
        formatTime(getTaskById(id), preferences.timeFormat);
    }
}