export function createTask(id, name, summary, category, progress, status, dueAt, createdAt, updatedAt, completedAt) {
    return {
        id,
        name,
        summary,
        category,
        progress,
        status,
        dueAt,
        createdAt,
        updatedAt,
        completedAt
    };
}