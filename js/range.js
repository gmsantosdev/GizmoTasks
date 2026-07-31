import { renderPercentage } from "./ui.js";

const rangeInput = document.querySelector("#task-range");

renderPercentage(rangeInput.value);
rangeInput.addEventListener("input", handleRange);

function handleRange(event) {
    renderPercentage(rangeInput.value);
}