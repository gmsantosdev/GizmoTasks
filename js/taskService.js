import { getTasks } from "./storage.js";

export function searchTasks(searchText, tasks) {
    const lowerSearch = searchText.toLowerCase();

    return tasks.filter(task => task.name.toLowerCase().includes(lowerSearch));
}

export function statusTasks(status, category) {
    const tasks = getTasks();

    const today = new Date().toISOString().slice(0, 10);
    if (!category) {
        return tasks.filter(task => task.status === status && task.category !== "important" && task.dueAt.slice(0, 10) !== today);
    } else {
        return tasks.filter(task => task.status === status && task.category !== category);
    }
}

export function categoryTasks(category) {
    const tasks = getTasks();

    const today = new Date().toISOString().slice(0, 10);
    return tasks.filter(task => task.category === category && task.dueAt.slice(0, 10) !== today);
}

export function todayTasks(category) {
    const tasks = getTasks();

    const today = new Date().toISOString().slice(0, 10);

    if (category) {
        return tasks.filter(task =>
            task.category === category &&
            task.dueAt.slice(0, 10) === today
        );
    }

    return tasks.filter(task =>
        task.dueAt.slice(0, 10) === today && task.category !== "important"
    );
}