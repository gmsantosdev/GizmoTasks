# Business Rules

## Rule 01

A task is considered expired when the current date and time are later than its due date and time. Expiration is dynamically determined and is not stored as a task status.

## Rule 02

Only existing tasks can be marked as completed.

## Rule 03

Completed tasks remain editable.

## Rule 04

Tasks whose due date has passed remain editable.

## Rule 05

Tasks cannot be created with a past due date.

## Rule 06

Task summaries displayed on cards are automatically truncated.

## Rule 07

Only tasks that are not already completed can be marked as completed.

## Rule 08

Completed tasks can be marked as active again.

## Rule 10

The Today status is generated automatically from the due date.

## Rule 11

Changing a task status does not modify its category.

## Rule 12

Task changes made in edit mode are only applied to the stored task when the user saves the changes.

## Rule 13

Canceling task editing discards the unsaved changes and returns the task to its previous state.