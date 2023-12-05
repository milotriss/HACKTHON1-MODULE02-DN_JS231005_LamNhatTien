"use strict";
let todo = [];
if (!JSON.parse(localStorage.getItem('todo'))) {
    localStorage.setItem('todo', JSON.stringify(todo));
}
function renderTodo() {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    let listsTodo = document.querySelector('.todoItems');
    let countUi = document.querySelector('.count');
    if (todoDb.length == 0) {
        listsTodo.innerHTML = `<img src="../asset/img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg">`;
    }
    else {
        listsTodo.innerHTML = "";
        todoDb.forEach((todo) => {
            if (todo.status == 2) {
                let count = todoDb.filter((item) => item.status == 2);
                listsTodo.innerHTML +=
                    `
                <li class="todoItem">
                    <div class="checkbox">
                        <input checked class="checkboxInput" onclick="changeStatus(${todo.id})" type="checkbox">
                        <p style="text-decoration:line-through;"}">${todo.content}</p>
                    </div>
                    <div class="icon">
                        <i onclick="openModel(${todo.id})" class="ti-pencil"></i>
                        <i onclick="deleteTodo(${todo.id})" class="ti-trash"></i>
                    </div>
                </li>
                `;
                countUi.innerHTML = `Completed: ${count.length}/${todoDb.length}`;
            }
            else {
                listsTodo.innerHTML +=
                    `
                <li class="todoItem">
                    <div class="checkbox">
                        <input class="checkboxInput" onclick="changeStatus(${todo.id})" type="checkbox">
                        <p>${todo.content}</p>
                    </div>
                    <div class="icon">
                        <i onclick="openModel(${todo.id})" class="ti-pencil"></i>
                        <i onclick="deleteTodo(${todo.id})" class="ti-trash"></i>
                    </div>
                </li>
                `;
            }
        });
    }
}
renderTodo();
function addTodo() {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    let todoElement = document.getElementById('enter');
    if (todoElement.value.length == 0) {
        alert('Enter your todo!!!');
    }
    else {
        if (todoDb.length == 0) {
            todoDb.push({
                id: 1,
                content: todoElement.value.trim(),
                status: 1
            });
        }
        else {
            todoDb.push({
                id: todoDb[todoDb.length - 1].id + 1,
                content: todoElement.value.trim(),
                status: 1
            });
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoDb));
    todoElement.value = '';
    renderTodo();
}
function deleteTodo(id) {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    if (confirm('Are you SURE delete it!!!')) {
        let newTodoDb = todoDb.filter((todo) => todo.id != id);
        localStorage.setItem('todo', JSON.stringify(newTodoDb));
        renderTodo();
    }
}
function openModel(id) {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    let model = document.querySelector('.modelOverlay');
    model.style.display = "flex";
    let needTodo = todoDb.find((todo) => todo.id == id);
    model.innerHTML =
        `
    <div class="model">
        <input class="enterNewTodo" placeholder="${needTodo === null || needTodo === void 0 ? void 0 : needTodo.content}" type="text">
        <button onclick="applyTodo(${needTodo === null || needTodo === void 0 ? void 0 : needTodo.id})">Apply</button>
        <button onclick="offModel(${needTodo === null || needTodo === void 0 ? void 0 : needTodo.id})">Cancel</button>
    </div>
    `;
}
function offModel(id) {
    let model = document.querySelector('.modelOverlay');
    model.style.display = "none";
}
function applyTodo(id) {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    let needTodo = todoDb.find((todo) => todo.id == id);
    let todoElement = document.querySelector('.enterNewTodo');
    if (confirm('Are you SURE edit this todo?')) {
        let newTodoDb = todoDb.map((todo) => {
            if (todo.id == (needTodo === null || needTodo === void 0 ? void 0 : needTodo.id)) {
                return Object.assign(Object.assign({}, needTodo), { content: todoElement.value.trim() });
            }
            return todo;
        });
        localStorage.setItem('todo', JSON.stringify(newTodoDb));
        renderTodo();
        offModel(id);
    }
}
function changeStatus(id) {
    let todoDb = JSON.parse(localStorage.getItem('todo'));
    let indexOfJob = todoDb.findIndex((item) => item.id == id);
    if (todoDb[indexOfJob].status == 1) {
        todoDb[indexOfJob].status = 2;
    }
    else {
        todoDb[indexOfJob].status = 1;
    }
    localStorage.setItem("todo", JSON.stringify(todoDb));
    renderTodo();
}
