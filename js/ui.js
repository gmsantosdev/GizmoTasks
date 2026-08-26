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
    if (time) {
        taskTime.value = time;
    }

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

    const completeText = document.querySelector("#complete-text");

    if (task.status === "completed") {
        completeText.textContent = "Mark as incomplete";
    } else {
        completeText.textContent = "Mark as complete";
    }
}

export function updateStatusUI(task, date, time) {
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

    const completeText = document.querySelector("#complete-text");

    if (task.status === "completed") {
        completeText.textContent = "Mark as incomplete";
    } else {
        completeText.textContent = "Mark as complete";
    }

    const updatedDateDetail = document.querySelector("#updated-date");
    let updatedYear, updatedMonth, updatedDay;
    if (task.updatedAt) {
        [updatedYear, updatedMonth, updatedDay] = task.updatedAt.slice(0, 10).split('-');
    }
    const completedDateDetail = document.querySelector("#completed-date");
    let completedYear, completedMonth, completedDay;
    if (task.completedAt) {
        [completedYear, completedMonth, completedDay] = task.completedAt.slice(0, 10).split('-');
    }
    
    if (date === "mm/dd/yyyy") {
        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedMonth}/${updatedDay}/${updatedYear}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedMonth}/${completedDay}/${completedYear}`;
            updatedDateDetail.textContent = "-";
        }
    } else if (date === "dd/mm/yyyy") {
        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedDay}/${updatedMonth}/${updatedYear}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedDay}/${completedMonth}/${completedYear}`;
            updatedDateDetail.textContent = "-";
        }
    } else if (date === "yyyy/mm/dd") {
        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedYear}/${updatedMonth}/${updatedDay}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedYear}/${completedMonth}/${completedDay}`;
            updatedDateDetail.textContent = "-";
        }
    }

    if (!task.updatedAt) {
        updatedDateDetail.textContent = "-";
    }

    let updatedHour, updatedMinute;
    if (task.updatedAt) {
        [updatedHour, updatedMinute] = task.updatedAt.slice(11, 16).split(':');
    }
    let completedHour, completedMinute;
    if (task.completedAt) {
        [completedHour, completedMinute] = task.completedAt.slice(11, 16).split(':');
    }
    
    if (time === "24h") {
        if (task.updatedAt) {
            updatedDateDetail.textContent = `${updatedDateDetail.textContent}, at ${updatedHour}:${updatedMinute}.`;
        }
        if (task.completedAt) {
            completedDateDetail.textContent = `${completedDateDetail.textContent}, at ${completedHour}:${completedMinute}.`;
        }
    } else if (time === "12h") {
        if (!task.completedAt) {
            if (task.updatedAt) {
                const updatedPeriod = updatedHour >= 12 ? 'PM' : 'AM';
                const updatedHour12 = updatedHour % 12 || 12;
                updatedDateDetail.textContent = `${updatedDateDetail.textContent}, at ${updatedHour12}:${updatedMinute} ${updatedPeriod}.`;
            }
        } else {
            const completedPeriod = completedHour >= 12 ? 'PM' : 'AM';
            const completedHour12 = completedHour % 12 || 12;
            completedDateDetail.textContent = `${completedDateDetail.textContent}, at ${completedHour12}:${completedMinute} ${completedPeriod}.`;
        }
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
    document.querySelector("#small-font").checked = preferences.fontSize === "small";
    document.querySelector("#medium-font").checked = preferences.fontSize === "medium";
    document.querySelector("#big-font").checked = preferences.fontSize === "big";
    document.querySelector("#us-date-format").checked = preferences.dateFormat === "mm/dd/yyyy";
    document.querySelector("#intl-date-format").checked = preferences.dateFormat === "dd/mm/yyyy";
    document.querySelector("#iso-date-format").checked = preferences.dateFormat === "yyyy/mm/dd";
    document.getElementById("12-hour-format").checked = preferences.timeFormat === "12h";
    document.getElementById("24-hour-format").checked = preferences.timeFormat === "24h";
}

export function formatDate(task, date) {
    const createdDateDetail = document.querySelector("#created-date");
    const [createdYear, createdMonth, createdDay] = task.createdAt.slice(0, 10).split('-');
    const updatedDateDetail = document.querySelector("#updated-date");

    let updatedYear, updatedMonth, updatedDay;
    if (task.updatedAt) {
        [updatedYear, updatedMonth, updatedDay] = task.updatedAt.slice(0, 10).split('-');
    }

    const dueDateDetail = document.querySelector("#due-date");
    const [dueYear, dueMonth, dueDay] = task.dueAt.slice(0, 10).split('-');
    const completedDateDetail = document.querySelector("#completed-date");

    let completedYear, completedMonth, completedDay;
    if (task.completedAt) {
        [completedYear, completedMonth, completedDay] = task.completedAt.slice(0, 10).split('-');
    }
    
    if (date === "mm/dd/yyyy") {
        createdDateDetail.textContent = `${createdMonth}/${createdDay}/${createdYear}`;
        dueDateDetail.textContent = `${dueMonth}/${dueDay}/${dueYear}`;

        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedMonth}/${updatedDay}/${updatedYear}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedMonth}/${completedDay}/${completedYear}`;
        }
    } else if (date === "dd/mm/yyyy") {
        createdDateDetail.textContent = `${createdDay}/${createdMonth}/${createdYear}`;
        dueDateDetail.textContent = `${dueDay}/${dueMonth}/${dueYear}`;

        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedDay}/${updatedMonth}/${updatedYear}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedDay}/${completedMonth}/${completedYear}`;
        }
    } else if (date === "yyyy/mm/dd") {
        createdDateDetail.textContent = `${createdYear}/${createdMonth}/${createdDay}`;
        dueDateDetail.textContent = `${dueYear}/${dueMonth}/${dueDay} `;

        if (!task.completedAt) {
            updatedDateDetail.textContent = `${updatedYear}/${updatedMonth}/${updatedDay}`;
            completedDateDetail.textContent = "-";
        } else {
            completedDateDetail.textContent = `${completedYear}/${completedMonth}/${completedDay}`;
        }
    }

    if (!task.updatedAt) {
        updatedDateDetail.textContent = "-";
    }
}

export function formatTime(task, time) {
    const createdDateDetail = document.querySelector("#created-date");
    const [createdHour, createdMinute] = task.createdAt.slice(11, 16).split(':');
    const updatedDateDetail = document.querySelector("#updated-date");

    let updatedHour, updatedMinute;
    if (task.updatedAt) {
        [updatedHour, updatedMinute] = task.updatedAt.slice(11, 16).split(':');
    }

    const dueDateDetail = document.querySelector("#due-date");
    const [dueHour, dueMinute] = task.dueAt.slice(11, 16).split(":");
    const completedDateDetail = document.querySelector("#completed-date");

    let completedHour, completedMinute;
    if (task.completedAt) {
        [completedHour, completedMinute] = task.completedAt.slice(11, 16).split(':');
    }
    
    if (time === "24h") {
        createdDateDetail.textContent = `${createdDateDetail.textContent}, at ${createdHour}:${createdMinute}.`;
        if (task.updatedAt) {
            updatedDateDetail.textContent = `${updatedDateDetail.textContent}, at ${updatedHour}:${updatedMinute}.`;
        }
        if (task.completedAt) {
            completedDateDetail.textContent = `${completedDateDetail.textContent}, at ${completedHour}:${completedMinute}.`;
        }
        if (task.dueAt.includes("T")) {
            dueDateDetail.textContent = `${dueDateDetail.textContent.slice(0, 10)}, at ${dueHour}:${dueMinute}.`;
        } else {
            dueDateDetail.textContent = `${dueDateDetail.textContent.slice(0, 10)}.`;
        }
    } else if (time === "12h") {
        const createdPeriod = createdHour >= 12 ? 'PM' : 'AM';
        const createdHour12 = createdHour % 12 || 12;
        createdDateDetail.textContent = `${createdDateDetail.textContent}, at ${createdHour12}:${createdMinute} ${createdPeriod}.`;

        if (!task.completedAt) {
            if (task.updatedAt) {
                const updatedPeriod = updatedHour >= 12 ? 'PM' : 'AM';
                const updatedHour12 = updatedHour % 12 || 12;
                updatedDateDetail.textContent = `${updatedDateDetail.textContent}, at ${updatedHour12}:${updatedMinute} ${updatedPeriod}.`;
            }
        } else {
            const completedPeriod = completedHour >= 12 ? 'PM' : 'AM';
            const completedHour12 = completedHour % 12 || 12;
            completedDateDetail.textContent = `${completedDateDetail.textContent}, at ${completedHour12}:${completedMinute} ${completedPeriod}.`;
        }

        const duePeriod = dueHour >= 12 ? 'PM' : 'AM';
        const dueHour12 = dueHour % 12 || 12;
        if (task.dueAt.includes("T")) {
            dueDateDetail.textContent = `${dueDateDetail.textContent}, at ${dueHour12}:${dueMinute} ${duePeriod}.`;
        } else {
            dueDateDetail.textContent = `${dueDateDetail.textContent.slice(0, 10)}.`;
        }
    }
}
