const deleteTodo = document.querySelector(".fa-trash"),
  btnAdd = document.querySelector(".btn-add"),
  todoText = document.querySelector(".todo-text"),
  checkbox = document.querySelector(".checkbox"),
  todoList = document.querySelector(".todo-list ul"),
  inputbox = document.querySelector(".inputbox");

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getTodos();
  createTodo(todos);
});
btnAdd.addEventListener("click", addtodo);
function addtodo() {
  if (!inputbox.value) return null;
  let newtodo = {
    title: inputbox.value,
    isComplated: false,
  };
  saveTodo(newtodo);
  createTodo(newtodo);
  inputbox.value = "";
}

// localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodo(todo) {
  let savedtodo = getTodos();
  console.log(savedtodo);
  savedtodo.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedtodo));
  return savedtodo;
}
