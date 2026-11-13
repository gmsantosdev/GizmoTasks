import { getTasks } from "./storage.js";

function isTaskExpired(task) {
    if (task.status === "completed") {
        return false;
    }

    const now = new Date();
    const today = getLocalDate();

    const dueDate = task.dueAt.slice(0, 10);

    if (dueDate < today) {
        return true;
    }

    if (dueDate === today && task.dueAt.includes("T")) {
        const currentTime =
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0");

        return task.dueAt.slice(11, 16) < currentTime;
    }

    return false;
}

export function searchTasks(searchText, tasks) {
    const lowerSearch = searchText.toLowerCase();

    return tasks.filter(task =>
        task.name.toLowerCase().includes(lowerSearch)
    );
}

export function statusTasks(status, category) {
    const tasks = getTasks();
    const today = getLocalDate();

    if (status === "expired") {
        return tasks.filter(task => isTaskExpired(task));
    }

    if (!category) {
        return tasks.filter(task =>
            task.status === status &&
            task.category !== "important" &&
            task.dueAt.slice(0, 10) !== today &&
            !isTaskExpired(task)
        );
    }

    return tasks.filter(task =>
        task.status === status &&
        task.category !== category
    );
}

export function categoryTasks(category) {
    const tasks = getTasks();

    const today = getLocalDate();

    return tasks.filter(task =>
        task.status === "active" &&
        task.category === category &&
        task.dueAt.slice(0, 10) !== today &&
        !isTaskExpired(task)
    );
}

export function todayTasks(category) {
    const tasks = getTasks();

    const now = new Date();
    const today = getLocalDate();

    const todayTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    if (category) {
        return tasks.filter(task => {
            if (task.dueAt.includes("T")) {
                return task.status === "active" && 
                    task.category === category &&
                    task.dueAt.slice(0, 10) === today &&
                    task.dueAt.slice(11, 16) >= todayTime;
            }

            return task.status === "active" && 
                task.category === category &&
                task.dueAt.slice(0, 10) === today;
        });
    }

    return tasks.filter(task => {
        if (task.dueAt.includes("T")) {
            return task.status === "active" && 
                task.category !== "important" &&
                task.dueAt.slice(0, 10) === today &&
                task.dueAt.slice(11, 16) >= todayTime;
        }

        return task.status === "active" && 
            task.category !== "important" &&
            task.dueAt.slice(0, 10) === today;
    });
}

function getLocalDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}