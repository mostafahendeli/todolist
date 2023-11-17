const btnAdd = document.querySelector(".btn-add"),
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
    id: Date.now(),
    title: inputbox.value,
    isComplated: false,
  };
  saveTodo(newtodo);
  createTodo(newtodo);
  inputbox.value = "";
}
function createTodo(todos) {
  todos = getTodos();
  let result = "";
  todos.forEach((todo) => {
    result += `<li>
    <div>
      <input type="checkbox" name="" id="todo-text" class="checkbox" data-todo-id="${
        todo.id
      }" ${todo.isComplated && "checked"} />
      <p id="todo-text" class="${todo.isComplated && "checked"}">${
      todo.title
    }</p>
    </div>
    <div>
      <span><i class="fas fa-trash" data-todo-id="${todo.id}"></i></span>
    </div>
  </li>`;
    todoList.innerHTML = result;
    // get buttons
    const deleteTodo = [...document.querySelectorAll(".fa-trash")];
    deleteTodo.forEach((btn) => btn.addEventListener("click", removeTodo));
  });
}

function removeTodo(e) {
  const id = Number(e.target.dataset.todoId);
  todos = getTodos();
  todos = todos.filter((todo) => Number(todo.id) != id);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodo(todo) {
  let savedtodo = getTodos();
  savedtodo.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedtodo));
  return savedtodo;
}
