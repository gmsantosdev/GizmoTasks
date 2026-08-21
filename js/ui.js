function isTaskExpired(task) {
    if (task.status === "completed") {
        return false;
    }

    const now = new Date();
    const dueAt = task.dueAt;

    if (dueAt.includes("T")) {
        const dueDate = dueAt.slice(0, 10);
        const dueTime = dueAt.slice(11, 16);

        const today = now.toISOString().slice(0, 10);
        const currentTime =
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0");

        if (dueDate < today) {
            return true;
        }

        if (dueDate === today && dueTime < currentTime) {
            return true;
        }

        return false;
    }

    const today = now.toISOString().slice(0, 10);
    return dueAt < today;
}

function getTaskDotClass(task) {
    const today = new Date().toISOString().slice(0, 10);

    if (task.status === "completed") {
        return "completed";
    }

    if (isTaskExpired(task)) {
        return "expired";
    }

    if (today === task.dueAt.slice(0, 10)) {
        if (task.category === "important") {
            return "today-important";
        }

        return "today";
    }

    return task.category;
}

export function renderTaskDetails(task) {
    const taskDot = document.querySelectorAll(".task-dot");
    const dotClass = getTaskDotClass(task);

    for (const dot of taskDot) {
        dot.className = `task-dot ${dotClass}`;
    }

    const taskName = document.querySelector("#task-name");
    taskName.value = task.name;

    const taskSummary = document.querySelector("#task-summary");
    taskSummary.value = task.summary;

    const taskCategory = document.querySelector("#task-category");
    taskCategory.value = task.category;

    const [date, time] = task.dueAt.split("T");

    const taskDate = document.querySelector("#task-date");
    const taskTime = document.querySelector("#task-time");
    taskDate.value = date;
    taskTime.value = time;

    const taskProgress = document.querySelector("#task-range");
    taskProgress.value = task.progress;

    const taskStatus = document.querySelector("#task-status");

    if (task.status === "completed") {
        taskStatus.textContent = "Completed";
    } else if (isTaskExpired(task)) {
        taskStatus.textContent = "Expired";
    } else {
        taskStatus.textContent = "Active";
    }

    const createdDateDetail = document.querySelector("#created-date");
    createdDateDetail.textContent =
        `${task.createdAt.replace("T", ", at ").replace(/-/g, "/")}.`;

    const updatedDateDetail = document.querySelector("#updated-date");

    if (task.updatedAt === null) {
        updatedDateDetail.textContent = "-";
    } else {
        updatedDateDetail.textContent =
            `${task.updatedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }

    const dueDateDetail = document.querySelector("#due-date");

    if (!time) {
        dueDateDetail.textContent = `${date.replace(/-/g, "/")}.`;
    } else {
        dueDateDetail.textContent =
            `${date.replace(/-/g, "/")}, at ${time}.`;
    }

    const completedDateDetail = document.querySelector("#completed-date");

    if (task.completedAt === null) {
        completedDateDetail.textContent = "-";
    } else {
        completedDateDetail.textContent =
            `${task.completedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }

    const completeText = document.querySelector("#complete-text");

    if (task.status === "completed") {
        completeText.textContent = "Mark as incomplete";
    } else {
        completeText.textContent = "Mark as complete";
    }
}

export function updateStatusUI(task) {
    const taskDot = document.querySelectorAll(".task-dot");
    const dotClass = getTaskDotClass(task);

    for (const dot of taskDot) {
        dot.className = `task-dot ${dotClass}`;
    }

    const taskStatus = document.querySelector("#task-status");

    if (task.status === "completed") {
        taskStatus.textContent = "Completed";
    } else if (isTaskExpired(task)) {
        taskStatus.textContent = "Expired";
    } else {
        taskStatus.textContent = "Active";
    }

    const completedDateDetail = document.querySelector("#completed-date");

    if (task.completedAt === null) {
        completedDateDetail.textContent = "-";
    } else {
        completedDateDetail.textContent =
            `${task.completedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }

    const completeText = document.querySelector("#complete-text");

    if (task.status === "completed") {
        completeText.textContent = "Mark as incomplete";
    } else {
        completeText.textContent = "Mark as complete";
    }
}

function renderTask(task) {
    const container = document.querySelector(".task-list");
    const card = document.createElement("li");

    const cardLink = document.createElement("a");
    cardLink.href = `task-details.html?id=${task.id}`;

    const title = document.createElement("h2");

    const titleSpan1 = document.createElement("span");
    titleSpan1.textContent = "● ";

    const dotClass = getTaskDotClass(task);
    titleSpan1.className = `${dotClass} dot`;

    const titleSpan2 = document.createElement("span");
    titleSpan2.textContent = task.name;

    const taskAbstract = document.createElement("p");
    const maxLength = 100;

    let abstract = task.summary;

    if (abstract.length > maxLength) {
        abstract = abstract.slice(0, maxLength);
        abstract = abstract.slice(0, abstract.lastIndexOf(" "));
        abstract = abstract.replace(/[.,;:!?]+$/, "");
        abstract += "...";
    }

    taskAbstract.textContent = abstract;

    title.append(titleSpan1, titleSpan2);
    cardLink.append(title, taskAbstract);
    card.append(cardLink);
    container.append(card);
}

export function renderTasks(tasks, search) {
    for (const task of tasks) {
        renderTask(task);
    }

    if (search) {
        const searchInput = document.querySelector("#search-text");
        searchInput.value = search;
    }
}

export function clearTasks() {
    const container = document.querySelector(".task-list");
    container.innerHTML = "";
}

export function renderPercentage(percentage) {
    const rangeSpan = document.querySelector("#range-span");
    rangeSpan.textContent = `${percentage}%`;
}

export function renderPreferences(preferences) {
    document.querySelector("#light-theme").checked = preferences.theme === "light";
    document.querySelector("#dark-theme").checked = preferences.theme === "dark";
}