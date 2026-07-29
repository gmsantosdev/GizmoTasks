import { getTaskById } from './storage.js';
import { renderTaskDetails } from './ui.js';

const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));

const task = getTaskById(id);
renderTaskDetails(task)