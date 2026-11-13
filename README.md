# GizmoTasks

GizmoTasks is a lightweight task management web application designed to help users create, organize, and track their daily tasks.

The application provides a simple interface for managing deadlines, task priorities, completion status, and progress, with customizable display preferences.

## Features

- **Task Management:** Create, edit, view, complete, reactivate, and delete tasks.
- **Task Categories:** Organize tasks into default and important categories.
- **Deadline Tracking:** Set due dates and optional times for tasks.
- **Progress Tracking:** Define and update task completion percentages.
- **Task Filtering:** Browse tasks by category, status, deadline, and completion state.
- **Search:** Find tasks by name.
- **Customizable Preferences:** Switch between light and dark themes, adjust font sizes, and customize date and time formats.
- **Data Persistence:** Store tasks and preferences locally using the browser's LocalStorage.
- **Confirmation Modals:** Receive feedback and confirm important actions before proceeding.

## Technologies

This project was developed using:

- **HTML5** — Page structure and semantic elements.
- **CSS3** — Styling, layouts, themes, and responsive design.
- **JavaScript (ES6+)** — Application logic, DOM manipulation, event handling, and LocalStorage management.

No external frameworks or libraries are required.

## Getting Started

### Prerequisites

You only need a modern web browser to use GizmoTasks.

For local development, a code editor such as Visual Studio Code and a local development server are recommended.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gmsantosdev/GizmoTasks.git
   ```

2. Open the project folder:

   ```bash
   cd GizmoTasks
   ```

3. Start a local development server, such as the **Live Server** extension in Visual Studio Code.

4. Open the application in your browser.

You can also access the HTML files through a compatible local server of your choice.

## Data Storage

GizmoTasks uses the browser's **LocalStorage** to persist tasks and user preferences.

This means that:

- Data remains available after refreshing or reopening the browser.
- Tasks and preferences are stored locally in the browser.
- Data is not synchronized between different browsers or devices.
- Clearing the browser's site data may permanently remove stored information.

The application does not require an account or a backend server.

## Project Structure

```text
GizmoTasks/
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── style.css
│   ├── variables.css
│   ├── reset.css
│   └── fonts.css
│
├── docs/
│
├── js/
│   ├── task.js
│   ├── storage.js
│   ├── taskService.js
│   ├── ui.js
│   └── ...
│
├── index.html
├── create-task.html
├── task-details.html
├── settings.html
└── README.md
```

## Project Purpose

GizmoTasks was developed to provide a practical task management experience while exploring core front-end development concepts, including DOM manipulation, JavaScript modules, event handling, asynchronous operations, and browser storage.
