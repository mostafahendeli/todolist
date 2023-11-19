const btnAdd = document.querySelector(".btn-add"),
  todoText = document.querySelector(".todo-text"),
  checkbox = document.querySelector(".checkbox"),
  todoList = document.querySelector(".todo-list ul"),
  inputbox = document.querySelector(".inputbox"),
  filter = document.querySelector("#filter");
let filterValue = "all";
// events
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getTodos();
  createTodo(todos);
});
filter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  console.log(filterValue);
  filterTodo();
});
btnAdd.addEventListener("click", addtodo);

// functions

function addtodo() {
  if (!inputbox.value) return null;
  let newtodo = {
    id: Date.now(),
    title: inputbox.value,
    isComplated: false,
  };
  saveTodo(newtodo);
  filterTodo(newtodo);
  inputbox.value = "";
}
function createTodo(todos) {
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
function filterTodo() {
  const todos = getTodos();
  console.log(filterValue);
  console.log(todos);
  switch (filterValue) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      const filteredtodos = todos.filter((t) => t.isComplated);
      console.log(filteredtodos);
      createTodo(filteredtodos);
      break;
    }
    case "uncompleted": {
      const filteredtodos = todos.filter((t) => !t.isComplated);
      createTodo(filteredtodos);
      break;
    }
    default:
      createTodo(todos);
  }
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
