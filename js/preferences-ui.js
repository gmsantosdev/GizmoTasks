import { getPreferences } from "./storage.js";


export function applyPreferences() {
    const preferences = getPreferences();
    const root = document.documentElement;
    
    root.setAttribute("data-theme", preferences.theme);
    root.setAttribute("data-font-size", preferences.fontSize);
}