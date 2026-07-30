export function getTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks == null) {
        tasks = [];
    }
    
    return tasks;
}

export function saveTask(task) {
    const allTasks = getTasks();
    allTasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function generateId() {
    const allTasks = getTasks();

    if (allTasks.length === 0) {
        return 1;
    }

    let biggerId = 0;
    for (let i = 0; i < allTasks.length; i++){
        if (allTasks[i].id > biggerId) {
            biggerId = allTasks[i].id;
        }
    }

    return biggerId + 1;
}

export function getTaskById(id) {
    const allTasks = getTasks();

    return allTasks.find(task => task.id === id);
}

export function updateTask(task) {
    const allTasks = getTasks();

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === task.id) {
            allTasks[i] = task;
            break;
        }
    }

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

export function removeTask(task) {
    const allTasks = getTasks();

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === task.id) {
            allTasks.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}