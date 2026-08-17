import { getTasks } from "./storage.js";

export function searchTasks(searchText, tasks) {
    const lowerSearch = searchText.toLowerCase();

    return tasks.filter(task => task.name.toLowerCase().includes(lowerSearch));
}

export function statusTasks(status, category) {
    const tasks = getTasks();

    const today = new Date().toISOString().slice(0, 10);

    if (status === "expired") {
        const now = new Date();
        const todayTime =
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0");

        return tasks.filter(task => {
            if (task.status === "completed") {
                return false;
            }

            const dueDate = task.dueAt.slice(0, 10);

            if (dueDate < today) {
                return true;
            }

            if (dueDate === today && task.dueAt.includes("T")) {
                return task.dueAt.slice(11, 16) < todayTime;
            }

            return false;
        });
    }

    if (!category) {
        return tasks.filter(task =>
            task.status === status &&
            task.category !== "important" &&
            task.dueAt.slice(0, 10) !== today
        );
    } else {
        return tasks.filter(task =>
            task.status === status &&
            task.category !== category
        );
    }
}

export function categoryTasks(category) {
    const tasks = getTasks();

    const today = new Date().toISOString().slice(0, 10);

    return tasks.filter(task =>
        task.category === category &&
        task.dueAt.slice(0, 10) !== today
    );
}

export function todayTasks(category) {
    const tasks = getTasks();
    const now = new Date();

    const today = now.toISOString().slice(0, 10);
    const todayTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    if (category) {
        return tasks.filter(task => {
            if (task.dueAt.includes("T")) {
                return task.category === category &&
                    task.dueAt.slice(0, 10) === today &&
                    task.dueAt.slice(11, 16) >= todayTime;
            } else {
                return task.category === category &&
                    task.dueAt.slice(0, 10) === today;
            }
        });
    }

    return tasks.filter(task => {
        if (task.dueAt.includes("T")) {
            return task.category !== "important" &&
                task.dueAt.slice(0, 10) === today &&
                task.dueAt.slice(11, 16) >= todayTime;
        } else {
            return task.category !== "important" &&
                task.dueAt.slice(0, 10) === today;
        }
    });
}