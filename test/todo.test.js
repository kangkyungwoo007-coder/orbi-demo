import { test } from "node:test";
import assert from "node:assert/strict";
import { addTodo, toggleTodo, removeTodo, visibleTodos, parseStoredTodos, serializeTodos } from "../src/todo.js";

test("addTodo appends a trimmed title with the next id", () => {
  const one = addTodo([], "  Buy milk ");
  assert.deepEqual(one, [{ id: 1, title: "Buy milk", done: false }]);
  assert.equal(addTodo(one, "Walk dog")[1].id, 2);
});

test("addTodo ignores an empty title", () => {
  assert.deepEqual(addTodo([], "   "), []);
});

test("toggleTodo flips only the matching todo", () => {
  const todos = addTodo(addTodo([], "a"), "b");
  const toggled = toggleTodo(todos, 2);
  assert.equal(toggled[0].done, false);
  assert.equal(toggled[1].done, true);
});

test("removeTodo drops the matching todo", () => {
  const todos = addTodo(addTodo([], "a"), "b");
  assert.deepEqual(removeTodo(todos, 1).map((t) => t.title), ["b"]);
});

test("visibleTodos filters by active and done", () => {
  const todos = toggleTodo(addTodo(addTodo([], "a"), "b"), 1);
  assert.deepEqual(visibleTodos(todos, "active").map((t) => t.title), ["b"]);
  assert.deepEqual(visibleTodos(todos, "done").map((t) => t.title), ["a"]);
  assert.equal(visibleTodos(todos, "all").length, 2);
});

test("parseStoredTodos round-trips a saved list in order", () => {
  const todos = [
    { id: 1, title: "a", done: false },
    { id: 2, title: "b", done: true },
  ];
  assert.deepEqual(parseStoredTodos(serializeTodos(todos)), todos);
});

test("parseStoredTodos starts empty for a missing or empty value", () => {
  assert.deepEqual(parseStoredTodos(null), []);
  assert.deepEqual(parseStoredTodos(undefined), []);
  assert.deepEqual(parseStoredTodos(""), []);
});

test("parseStoredTodos starts empty for a malformed value instead of throwing", () => {
  assert.deepEqual(parseStoredTodos("{not json"), []);
  assert.deepEqual(parseStoredTodos('{"id":1}'), []);
  assert.deepEqual(parseStoredTodos("42"), []);
});

test("parseStoredTodos drops entries that are not todos", () => {
  const raw = JSON.stringify([
    { id: 1, title: "keep", done: false },
    { id: "x", title: "bad id", done: false },
    { id: 2, title: "bad done", done: "yes" },
    null,
    "nope",
  ]);
  assert.deepEqual(parseStoredTodos(raw), [{ id: 1, title: "keep", done: false }]);
});
