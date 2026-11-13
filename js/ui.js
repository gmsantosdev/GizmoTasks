function isTaskExpired(task) {
    if (task.status === "completed") {
        return false;
    }

    const now = new Date();
    const dueAt = task.dueAt;

    if (dueAt.includes("T")) {
        const dueDate = dueAt.slice(0, 10);
        const dueTime = dueAt.slice(11, 16);

        const today = getLocalDate();
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

    const today = getLocalDate();
    return dueAt < today;
}

function getTaskDotClass(task) {
    const today = getLocalDate();

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


export function renderTaskDetails(task, date, time) {
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

    const [dateValue, timeValue] = task.dueAt.split("T");

    const taskDate = document.querySelector("#task-date");
    const taskTime = document.querySelector("#task-time");

    taskDate.value = dateValue;
    taskTime.value = timeValue || "";

    const taskProgress = document.querySelector("#task-range");
    taskProgress.value = task.progress;

    // Update all status elements
    const taskStatus = document.querySelectorAll(".task-status");

    let statusText;

    if (task.status === "completed") {
        statusText = "Completed";
    } else if (isTaskExpired(task)) {
        statusText = "Expired";
    } else {
        statusText = "Active";
    }

    taskStatus.forEach(element => {
        element.textContent = statusText;
    });

    const completeText = document.querySelectorAll(".complete-text");

    if (task.status === "completed") {
        completeText.forEach(element => {
            element.textContent = "Mark as incomplete";
        });
    } else {
        completeText.forEach(element => {
            element.textContent = "Mark as complete";
        });
    }

    const createdDateDetail = document.querySelectorAll(".created-date");
    const updatedDateDetail = document.querySelectorAll(".updated-date");
    const dueDateDetail = document.querySelectorAll(".due-date");
    const completedDateDetail = document.querySelectorAll(".completed-date");

    function formatDateValue(value) {
        if (!value) return "-";

        const [year, month, day] = value.slice(0, 10).split("-");

        if (date === "mm/dd/yyyy") {
            return `${month}/${day}/${year}`;
        } else if (date === "dd/mm/yyyy") {
            return `${day}/${month}/${year}`;
        } else if (date === "yyyy/mm/dd") {
            return `${year}/${month}/${day}`;
        }
        return `${day}/${month}/${year}`;
    }

    function formatTimeValue(value) {
        if (!value || !value.includes("T")) return "";

        const [hour, minute] = value.slice(11, 16).split(":");

        if (time === "24h") {
            return `, at ${hour}:${minute}`;
        } else if (time === "12h") {
            const numericHour = Number(hour);
            const period = numericHour >= 12 ? "PM" : "AM";
            const hour12 = numericHour % 12 || 12;

            return `, at ${hour12}:${minute} ${period}`;
        }

        return "";
    }

    const createdText = formatDateValue(task.createdAt) + formatTimeValue(task.createdAt);
    const updatedText = formatDateValue(task.updatedAt) + formatTimeValue(task.updatedAt);
    const dueText = formatDateValue(task.dueAt) + formatTimeValue(task.dueAt);
    const completedText = formatDateValue(task.completedAt) + formatTimeValue(task.completedAt);

    createdDateDetail.forEach(element => element.textContent = createdText);
    updatedDateDetail.forEach(element => element.textContent = updatedText);
    dueDateDetail.forEach(element => element.textContent = dueText);
    completedDateDetail.forEach(element => element.textContent = completedText);
}

export function updateStatusUI(task, date, time) {
    const taskDot = document.querySelectorAll(".task-dot");
    const taskStatus = document.querySelectorAll(".task-status");
    const completeText = document.querySelectorAll(".complete-text");

    const dotClass = getTaskDotClass(task);

    taskDot.forEach(element => {
        element.className = `task-dot ${dotClass}`;
    });

    let statusText;

    if (task.status === "completed") {
        statusText = "Completed";
    } else if (isTaskExpired(task)) {
        statusText = "Expired";
    } else {
        statusText = "Active";
    }

    taskStatus.forEach(element => {
        element.textContent = statusText;
    });

    completeText.forEach(element => {
        if (task.status === "completed") {
            element.textContent = "Mark as incomplete";
        } else {
            element.textContent = "Mark as complete";
        }
    });

    const updatedDateDetail = document.querySelectorAll(".updated-date");
    const completedDateDetail = document.querySelectorAll(".completed-date");

    function formatDateValue(value) {
        if (!value) return "-";

        const [year, month, day] = value.slice(0, 10).split("-");

        if (date === "mm/dd/yyyy") {
            return `${month}/${day}/${year}`;
        } else if (date === "dd/mm/yyyy") {
            return `${day}/${month}/${year}`;
        } else if (date === "yyyy/mm/dd") {
            return `${year}/${month}/${day}`;
        }

        return `${day}/${month}/${year}`;
    }

    function formatTimeValue(value) {
        if (!value || !value.includes("T")) return "";

        const [hour, minute] = value.slice(11, 16).split(":");

        if (time === "24h") {
            return `, at ${hour}:${minute}`;
        } else if (time === "12h") {
            const numericHour = Number(hour);
            const period = numericHour >= 12 ? "PM" : "AM";
            const hour12 = numericHour % 12 || 12;

            return `, at ${hour12}:${minute} ${period}`;
        }

        return "";
    }

    const updatedText = task.updatedAt ? formatDateValue(task.updatedAt) + formatTimeValue(task.updatedAt) : "-";

    const completedText = task.completedAt ? formatDateValue(task.completedAt) + formatTimeValue(task.completedAt) : "-";

    updatedDateDetail.forEach(element => {
        element.textContent = updatedText;
    });

    completedDateDetail.forEach(element => {
        element.textContent = completedText;
    });
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
    const createdDateDetail = document.querySelectorAll(".created-date");
    const [createdYear, createdMonth, createdDay] = task.createdAt.slice(0, 10).split('-');

    const updatedDateDetail = document.querySelectorAll(".updated-date");

    let updatedYear, updatedMonth, updatedDay;
    if (task.updatedAt) {
        [updatedYear, updatedMonth, updatedDay] = task.updatedAt.slice(0, 10).split('-');
    }

    const dueDateDetail = document.querySelectorAll(".due-date");
    const [dueYear, dueMonth, dueDay] = task.dueAt.slice(0, 10).split('-');

    const completedDateDetail = document.querySelectorAll(".completed-date");

    let completedYear, completedMonth, completedDay;
    if (task.completedAt) {
        [completedYear, completedMonth, completedDay] = task.completedAt.slice(0, 10).split('-');
    }

    if (date === "mm/dd/yyyy") {
        createdDateDetail.forEach(element => {
            element.textContent = `${createdMonth}/${createdDay}/${createdYear}`;
        });

        dueDateDetail.forEach(element => {
            element.textContent = `${dueMonth}/${dueDay}/${dueYear}`;
        });

        if (!task.completedAt) {
            updatedDateDetail.forEach(element => {
                element.textContent = `${updatedMonth}/${updatedDay}/${updatedYear}`;
            });

            completedDateDetail.forEach(element => {
                element.textContent = "-";
            });
        } else {
            completedDateDetail.forEach(element => {
                element.textContent = `${completedMonth}/${completedDay}/${completedYear}`;
            });
        }

    } else if (date === "dd/mm/yyyy") {
        createdDateDetail.forEach(element => {
            element.textContent = `${createdDay}/${createdMonth}/${createdYear}`;
        });

        dueDateDetail.forEach(element => {
            element.textContent = `${dueDay}/${dueMonth}/${dueYear}`;
        });

        if (!task.completedAt) {
            updatedDateDetail.forEach(element => {
                element.textContent = `${updatedDay}/${updatedMonth}/${updatedYear}`;
            });

            completedDateDetail.forEach(element => {
                element.textContent = "-";
            });
        } else {
            completedDateDetail.forEach(element => {
                element.textContent = `${completedDay}/${completedMonth}/${completedYear}`;
            });
        }

    } else if (date === "yyyy/mm/dd") {
        createdDateDetail.forEach(element => {
            element.textContent = `${createdYear}/${createdMonth}/${createdDay}`;
        });

        dueDateDetail.forEach(element => {
            element.textContent = `${dueYear}/${dueMonth}/${dueDay} `;
        });

        if (!task.completedAt) {
            updatedDateDetail.forEach(element => {
                element.textContent = `${updatedYear}/${updatedMonth}/${updatedDay}`;
            });

            completedDateDetail.forEach(element => {
                element.textContent = "-";
            });
        } else {
            completedDateDetail.forEach(element => {
                element.textContent = `${completedYear}/${completedMonth}/${completedDay}`;
            });
        }
    }

    if (!task.updatedAt) {
        updatedDateDetail.forEach(element => {
            element.textContent = "-";
        });
    }
}

export function formatTime(task, time) {
    const createdDateDetail = document.querySelectorAll(".created-date");
    const [createdHour, createdMinute] = task.createdAt.slice(11, 16).split(':');

    const updatedDateDetail = document.querySelectorAll(".updated-date");

    let updatedHour, updatedMinute;
    if (task.updatedAt) {
        [updatedHour, updatedMinute] = task.updatedAt.slice(11, 16).split(':');
    }

    const dueDateDetail = document.querySelectorAll(".due-date");
    const [dueHour, dueMinute] = task.dueAt.slice(11, 16).split(":");

    const completedDateDetail = document.querySelectorAll(".completed-date");

    let completedHour, completedMinute;
    if (task.completedAt) {
        [completedHour, completedMinute] = task.completedAt.slice(11, 16).split(':');
    }

    if (time === "24h") {
        createdDateDetail.forEach(element => {
            element.textContent = `${element.textContent}, at ${createdHour}:${createdMinute}.`;
        });

        if (task.updatedAt) {
            updatedDateDetail.forEach(element => {
                element.textContent = `${element.textContent}, at ${updatedHour}:${updatedMinute}.`;
            });
        }

        if (task.completedAt) {
            completedDateDetail.forEach(element => {
                element.textContent = `${element.textContent}, at ${completedHour}:${completedMinute}.`;
            });
        }

        if (task.dueAt.includes("T")) {
            dueDateDetail.forEach(element => {
                element.textContent = `${element.textContent.slice(0, 10)}, at ${dueHour}:${dueMinute}.`;
            });
        } else {
            dueDateDetail.forEach(element => {
                element.textContent = `${element.textContent.slice(0, 10)}.`;
            });
        }

    } else if (time === "12h") {
        const createdPeriod = createdHour >= 12 ? 'PM' : 'AM';
        const createdHour12 = createdHour % 12 || 12;

        createdDateDetail.forEach(element => {
            element.textContent = `${element.textContent}, at ${createdHour12}:${createdMinute} ${createdPeriod}.`;
        });

        if (!task.completedAt) {
            if (task.updatedAt) {
                const updatedPeriod = updatedHour >= 12 ? 'PM' : 'AM';
                const updatedHour12 = updatedHour % 12 || 12;

                updatedDateDetail.forEach(element => {
                    element.textContent = `${element.textContent}, at ${updatedHour12}:${updatedMinute} ${updatedPeriod}.`;
                });
            }
        } else {
            const completedPeriod = completedHour >= 12 ? 'PM' : 'AM';
            const completedHour12 = completedHour % 12 || 12;

            completedDateDetail.forEach(element => {
                element.textContent = `${element.textContent}, at ${completedHour12}:${completedMinute} ${completedPeriod}.`;
            });
        }

        const duePeriod = dueHour >= 12 ? 'PM' : 'AM';
        const dueHour12 = dueHour % 12 || 12;

        if (task.dueAt.includes("T")) {
            dueDateDetail.forEach(element => {
                element.textContent = `${element.textContent}, at ${dueHour12}:${dueMinute} ${duePeriod}.`;
            });
        } else {
            dueDateDetail.forEach(element => {
                element.textContent = `${element.textContent.slice(0, 10)}.`;
            });
        }
    }
}

export function renderTaskView(task, dateFormat, timeFormat) {
    const title = document.querySelector("#view-name");
    title.textContent = task.name;

    const summary = document.querySelector("#view-summary");
    summary.textContent = task.summary;

    const category = document.querySelector("#view-category");
    category.textContent = task.category;

    const dueDate = document.querySelector("#view-date");
    const dueTime = document.querySelector("#view-time");

    const [year, month, day] = task.dueAt.slice(0, 10).split("-");

    if (dateFormat === "mm/dd/yyyy") {
        dueDate.textContent = `${month}/${day}/${year}`;
    } else if (dateFormat === "dd/mm/yyyy") {
        dueDate.textContent = `${day}/${month}/${year}`;
    } else if (dateFormat === "yyyy/mm/dd") {
        dueDate.textContent = `${year}/${month}/${day}`;
    }

    if (task.dueAt.includes("T")) {
        const [hour, minute] = task.dueAt.split("T")[1].slice(0, 5).split(":");
        const numericHour = Number(hour);

        if (timeFormat === "24h") {
            dueTime.textContent = `${hour}:${minute}`;
        } else if (timeFormat === "12h") {
            const period = numericHour >= 12 ? "PM" : "AM";
            const hour12 = numericHour % 12 || 12;

            dueTime.textContent = `${hour12}:${minute} ${period}`;
        }
    } else {
        dueTime.textContent = "Not set";
    }

    const progress = document.querySelector("#view-percentage");
    progress.textContent = `${task.progress}%`;
}

function getLocalDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}