export function renderTaskDetails(task) {
    const taskName = document.querySelector("#task-name");
    taskName.textContent = task.name;

    const taskDot = document.querySelectorAll(".task-dot");
    for (const dot of taskDot) {
        dot.className = `task-dot ${task.category}`;
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
    if (time === "") {
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
}