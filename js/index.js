import { getTasks } from "./storage.js";
import { renderTasks } from "./ui.js";

const tasks = getTasks();
renderTasks(tasks);