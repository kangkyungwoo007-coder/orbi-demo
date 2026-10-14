import { addTodo, toggleTodo, removeTodo, visibleTodos } from "./todo.js";

let todos = [];
let filter = "all";

const form = document.querySelector("#new-todo");
const input = document.querySelector("#title");
const list = document.querySelector("#list");

function render() {
  list.replaceChildren(
    ...visibleTodos(todos, filter).map((t) => {
      const li = document.createElement("li");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = t.done;
      box.addEventListener("change", () => { todos = toggleTodo(todos, t.id); render(); });
      const label = document.createElement("span");
      label.textContent = t.title;
      if (t.done) label.className = "done";
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", () => { todos = removeTodo(todos, t.id); render(); });
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
  todos = addTodo(todos, input.value);
  input.value = "";
  render();
});

for (const b of document.querySelectorAll("[data-filter]")) {
  b.addEventListener("click", () => { filter = b.dataset.filter; render(); });
}

render();
