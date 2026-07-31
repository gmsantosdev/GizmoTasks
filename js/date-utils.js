export function setMinDate() {
    const dateInput = document.querySelector("#task-date");

    const now = new Date();

    const today =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

    dateInput.min = today;
}

export function setMinTime(dateInput) {
    const timeInput = document.querySelector("#task-time");
    const today = new Date().toISOString().slice(0, 10);

    const now = new Date();
    if (dateInput.value === today) {
        timeInput.min = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
    } else {
        timeInput.min = "";
    }
}