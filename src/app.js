import { addTodo, toggleTodo, removeTodo, visibleTodos, parseStoredTodos, serializeTodos, STORAGE_KEY } from "./todo.js";

let todos = parseStoredTodos(localStorage.getItem(STORAGE_KEY));
let filter = "all";

const form = document.querySelector("#new-todo");
const input = document.querySelector("#title");
const list = document.querySelector("#list");

// Every list change goes through here: store it, then render it.
function commit(nextTodos) {
  todos = nextTodos;
  localStorage.setItem(STORAGE_KEY, serializeTodos(todos));
  render();
}

function render() {
  list.replaceChildren(
    ...visibleTodos(todos, filter).map((t) => {
      const li = document.createElement("li");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = t.done;
      box.addEventListener("change", () => commit(toggleTodo(todos, t.id)));
      const label = document.createElement("span");
      label.textContent = t.title;
      if (t.done) label.className = "done";
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", () => commit(removeTodo(todos, t.id)));
      li.append(box, label, del);
      return li;
    }),
  );
  for (const b of document.querySelectorAll("[data-filter]")) {
    b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  commit(addTodo(todos, input.value));
  input.value = "";
});

for (const b of document.querySelectorAll("[data-filter]")) {
  b.addEventListener("click", () => { filter = b.dataset.filter; render(); });
}

render();
