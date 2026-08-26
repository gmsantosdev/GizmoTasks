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
    } else if (radioClicked.id === "dark-theme") {
        root.setAttribute("data-theme", "dark");
        preferences.theme = "dark";
    } else if (radioClicked.id === "small-font") {
        root.setAttribute("data-font-size", "small");
        preferences.fontSize = "small";
    } else if (radioClicked.id === "medium-font") {
        root.setAttribute("data-font-size", "medium");
        preferences.fontSize = "medium";
    } else if (radioClicked.id === "big-font") {
        root.setAttribute("data-font-size", "big");
        preferences.fontSize = "big";
    } else if (radioClicked.id === "us-date-format") {
        preferences.dateFormat = "mm/dd/yyyy";
    } else if (radioClicked.id === "intl-date-format") {
        preferences.dateFormat = "dd/mm/yyyy";
    } else if (radioClicked.id === "iso-date-format") {
        preferences.dateFormat = "yyyy/mm/dd";
    } else if (radioClicked.id === "12-hour-format") {
        preferences.timeFormat = "12h";
    } else if (radioClicked.id === "24-hour-format") {
        preferences.timeFormat = "24h"
    }
    savePreferences(preferences);
}
