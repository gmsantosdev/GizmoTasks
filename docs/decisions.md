# Decision 01

The application will be entirely in English.

Reason:
To make the portfolio more professional and accessible.

# Decision 02

The sidebar will centralize task organization and navigation.

Reason:
Allows future scalability.

# Decision 03

The application will use LocalStorage before introducing a database.

Reason:
Simplifies the MVP.

# Decision 04

Task creation will require only essential information.

Reason:
To reduce problems during task creation and allow users to register ideas quickly.

# Decision 05

The project will use Google Fonts to manage the fonts.

Reason:
To simplify font management during development and avoid storing local font files.

# Decision 06

Colors and font families will be centralized in `variables.css` using CSS Custom Properties (`:root`)

Reason:
To improve maintainability and support future theme implementation.

# Decision 07

Task cards will automatically display a shortened version of the task summary instead of requiring a separate description field.

Reason:
To simplify task creation, reduce duplicated information, and keep task cards consistent.

# Decision 08

Expired tasks will be dynamically determined by comparing the current date and time with the task's due date and time.

Reason:
Prevents inconsistent data and avoids storing a temporary state that can become outdated.

# Decision 09

Completed tasks can still be edited.

Reason:
Allows users to correct mistakes, update information, or reopen finished work without creating duplicate tasks.

# Decision 10

Tasks cannot be created with a due date earlier than the current date.

Reason:
Prevents invalid task states and guarantees data consistency.

# Decision 11

Expired tasks will appear both in the "All Tasks" view and in the "Expired Tasks" category.

Reason:
Allows users to find expired tasks easily without removing them from the complete task list.

# Decision 12

Task categories, task status, and task states are different concepts.

Reason:
Categories organize tasks by priority, status represents the task lifecycle, and states such as Today and Expired are derived dynamically from task data.

# Decision 13

Completed tasks preserve their original category, and expiration does not modify the task category.

Reason:
Keeps task organization independent from the task's lifecycle and due date.

# Decision 14

The Today state is calculated automatically from the due date instead of being stored.

Reason:
Prevents outdated information and keeps the task list synchronized with the current date.

# Decision 15

Expired is a dynamically calculated task state rather than a stored task status.

Reason:
The expired state depends on the current date and time, so storing it could create inconsistent data when time passes.