// console.log("hello");
window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const name = localStorage.getItem("name") || "";
  nameInput.value = name;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("name", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements[0].value,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();
    displayTodos();
  });
  displayTodos();
});

function displayTodos() {
  let todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  // console.log(todos);
  todos.forEach((todo) => {
    // console.log(todo);
    let todoItem = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    let content = document.createElement("content");
    let actions = document.createElement("div");
    let edit = document.createElement("button");
    let delButton = document.createElement("button");

    todoItem.classList.add("todo-item");
    input.type = "checkbox";
    content.classList.add("content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    delButton.classList.add("delete");

    content.innerHTML = `<input type="text" name="content" id="content" readOnly
     value=${todo.content}>`;
    edit.innerText = "Edit";
    delButton.innerText = "Delete";

    label.appendChild(input);
    actions.appendChild(edit);
    actions.appendChild(delButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    edit.addEventListener("click", () => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        // displayTodos();
      });
    });

    delButton.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}
