// Todo list logic. Pure functions over an array of { id, title, done }.
// The page (src/app.js) only renders what these return; test/todo.test.js covers them.

export function addTodo(todos, title) {
  const text = String(title).trim();
  if (text === "") return todos;
  const id = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  return [...todos, { id, title: text, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

export function visibleTodos(todos, filter) {
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "done") return todos.filter((t) => t.done);
  return todos;
}

// The one stable localStorage key for the list. Never change it: a different key
// would orphan the todos saved by an earlier version of the page.
export const STORAGE_KEY = "orbi-demo.todos";

// Turn the raw localStorage value into a todo array. A value that is missing,
// empty, malformed, not an array, or holds entries that are not todos yields an
// empty list (dropping only the bad entries) instead of throwing.
export function parseStoredTodos(raw) {
  if (typeof raw !== "string" || raw === "") return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter(
      (t) =>
        t !== null &&
        typeof t === "object" &&
        Number.isInteger(t.id) &&
        typeof t.title === "string" &&
        typeof t.done === "boolean",
    )
    .map((t) => ({ id: t.id, title: t.title, done: t.done }));
}

// The value written back to localStorage after every change.
export function serializeTodos(todos) {
  return JSON.stringify(todos);
}
