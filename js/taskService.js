import { getTasks } from "./storage.js";

export function searchTasks(searchText) {
    const tasks = getTasks();
    const lowerSearch = searchText.toLowerCase();

    return tasks.filter(task => {
        return task.name.toLowerCase().includes(lowerSearch);
    });
}