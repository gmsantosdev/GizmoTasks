export function renderTaskDetails(task) {
    const taskName = document.querySelector("#task-name");
    taskName.textContent = task.name;

    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    console.log(task.dueAt);
    console.log(task.dueAt.slice(0, 10));
    const taskDot = document.querySelectorAll(".task-dot");
    if (task.status === "completed" || task.status === "expired") {
        for (const dot of taskDot) {
            dot.className = `task-dot ${task.status}`;
        }
    } else if (today === task.dueAt.slice(0, 10)) {
        if (task.category === "important") {
            for (const dot of taskDot) {
                dot.className = `task-dot today-important`;
            }
        } else {
            for (const dot of taskDot) {
                dot.className = `task-dot today`;
            }
        }
    } else {
        for (const dot of taskDot) {
            dot.className = `task-dot ${task.category}`;
        }
    }

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
    taskStatus.textContent = task.status[0].toUpperCase() + task.status.slice(1);

    const createdDateDetail = document.querySelector("#created-date");
    createdDateDetail.textContent = `${task.createdAt.replace("T", ", at ").replace(/-/g, "/")}.`;

    const updatedDateDetail = document.querySelector("#updated-date");
    if (task.updatedAt === null) {
        updatedDateDetail.textContent = `-`;
    } else {
        updatedDateDetail.textContent = `${task.updatedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }
    
    const dueDateDetail = document.querySelector("#due-date");
    if (!time) {
        dueDateDetail.textContent = `${date.replace(/-/g, "/")}.`;
    } else {
        dueDateDetail.textContent = `${date.replace(/-/g, "/")}, at ${time}.`;
    }

    const completedDateDetail = document.querySelector("#completed-date");
    if (task.completedAt === null) {
        completedDateDetail.textContent = `-`;
    } else {
        completedDateDetail.textContent = `${task.completedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }

    const completeText = document.querySelector("#complete-text");
    if (task.status === "completed") {
        completeText.textContent = `Mark as incomplete`;
    } else {
        completeText.textContent = `Mark as complete`;
    }
}

export function updateStatusUI(task) {
    const today = new Date().toISOString().slice(0, 10);
    const taskDot = document.querySelectorAll(".task-dot");
    if (task.status === "completed" || task.status === "expired") {
        for (const dot of taskDot) {
            dot.className = `task-dot ${task.status}`;
        }
    } else if (today === task.dueAt.slice(0, 10)) {
        if (task.category === "important") {
            for (const dot of taskDot) {
                dot.className = `task-dot today-important`;
            }
        } else {
            for (const dot of taskDot) {
                dot.className = `task-dot today`;
            }
        }
    } else {
        for (const dot of taskDot) {
            dot.className = `task-dot ${task.category}`;
        }
    }

    const taskStatus = document.querySelector("#task-status");
    taskStatus.textContent = task.status[0].toUpperCase() + task.status.slice(1);

    const completedDateDetail = document.querySelector("#completed-date");
    if (task.completedAt === null) {
        completedDateDetail.textContent = `-`;
    } else {
        completedDateDetail.textContent = `${task.completedAt.replace("T", ", at ").replace(/-/g, "/")}.`;
    }

    const completeText = document.querySelector("#complete-text");
    if (task.status === "completed") {
        completeText.textContent = `Mark as incomplete`;
    } else {
        completeText.textContent = `Mark as complete`;
    }
}

function renderTask(task) {
    console.log("rendertask")
    const container = document.querySelector(".task-list");
    const card = document.createElement("li");
    const cardLink = document.createElement("a");
    cardLink.href = `task-details.html?id=${task.id}`;

    const title = document.createElement("h2");
    const titleSpan1 = document.createElement("span");
    titleSpan1.textContent = "● ";

    const today = new Date().toISOString().slice(0, 10);
    if (task.status !== "active") {
        titleSpan1.className = `${task.status} dot`;
    } else if (today === task.dueAt.slice(0, 10)) {
        if (task.category === "important") {
            titleSpan1.className = `today-important dot`;
        } else {
            titleSpan1.className = `today dot`;
        }
    } else {
        titleSpan1.className = `${task.category} dot`;
    }
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

export function renderTasks(tasks) {
    for (const task of tasks) {
        renderTask(task);
    }
}

export function clearTasks() {
    const container = document.querySelector(".task-list");
    container.innerHTML = "";
}