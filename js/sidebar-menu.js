import { applyPreferences } from "./preferences-ui.js";
import { getPreferences, savePreferences } from "./storage.js";

const menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", handleMenu);

function handleMenu() {
    const preferences = getPreferences();
    if (preferences.sidebar === "expanded") {
        preferences.sidebar = "collapsed";
    } else {
        preferences.sidebar = "expanded";
    }

    savePreferences(preferences);
    applyPreferences();
}
