export function createTask(id, name, summary, category, progress, dueAt, createdAt) {
    return {
        id,
        name,
        summary,
        category,
        progress,
        status: "active",
        dueAt,
        createdAt,
        updatedAt: null,
        completedAt: null
    };
}