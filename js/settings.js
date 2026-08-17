import { applyPreferences } from "./preferences-ui.js";
import { getPreferences, savePreferences } from "./storage.js";
import { renderPreferences } from "./ui.js";

applyPreferences();
renderPreferences(getPreferences())

const form = document.querySelector("#settings");
form.addEventListener("input", handleRadio);

function handleRadio(event) {
    const radioClicked = event.target;
    const root = document.documentElement;
    const preferences = getPreferences();

    if (radioClicked.id === "light-theme") {
        root.setAttribute("data-theme", "light");
        preferences.theme = "light";
        savePreferences(preferences);
    } else if (radioClicked.id === "dark-theme") {
        root.setAttribute("data-theme", "dark");
        preferences.theme = "dark";
        savePreferences(preferences);
    }
}
