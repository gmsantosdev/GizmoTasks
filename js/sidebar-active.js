const params = new URLSearchParams(window.location.search);
const currentPage = window.location.pathname;
let sidebarActive = null;

if (currentPage.endsWith("create-task.html")) {
    sidebarActive = document.querySelector(".create-option");
} else if (currentPage.endsWith("index.html")) {
    if (params.toString() === "") {
        sidebarActive = document.querySelector(".all-option");
    } else if (params.get("status") === "active") {
        sidebarActive = document.querySelector(".default-option");
    } else if (params.get("filter") === "today" && params.get("category") !== "important") {
        sidebarActive = document.querySelector(".today-option");
    } else if (params.get("filter") === "today" && params.get("category") === "important") {
        sidebarActive = document.querySelector(".today-important-option");
    } else if (params.get("category") === "important") {
        sidebarActive = document.querySelector(".important-option");
    } else if (params.get("status") === "completed") {
        sidebarActive = document.querySelector(".completed-option");
    } else if (params.get("status") === "expired") {
        sidebarActive = document.querySelector(".expired-option");
    }
}

if (sidebarActive) {
    sidebarActive.classList.add("active-sidebar");
}