interface Todo {
    id:number
    content:string
    status:number
}

let todo:Todo[] = []
if (!JSON.parse(localStorage.getItem('todo') as string)) {
    localStorage.setItem('todo',JSON.stringify(todo))
}

function renderTodo():void{
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)
    let listsTodo:HTMLElement = document.querySelector('.todoItems') as HTMLElement
    let countUi:HTMLElement = document.querySelector('.count') as HTMLElement
    if (todoDb.length == 0) {
        listsTodo.innerHTML = `<img src="../asset/img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg">`
    }else{
        listsTodo.innerHTML = ""
        todoDb.forEach((todo:Todo) =>{
            if (todo.status == 2) {
                let count:Todo[] = todoDb.filter((item:Todo) => item.status == 2)
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
                `
                countUi.innerHTML = `Completed: ${count.length}/${todoDb.length}`
            }else{
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
                `
            }
            
        })
    }
}
renderTodo()

function addTodo():void{
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)
    let todoElement:HTMLInputElement = document.getElementById('enter') as HTMLInputElement
    
    if (todoElement.value.length == 0) {
        alert('Enter your todo!!!')
    }else{
        if (todoDb.length == 0) {
            todoDb.push({
                id:1,
                content: todoElement.value.trim(),
                status: 1
            })
        }else{
            todoDb.push({
                id: todoDb[todoDb.length - 1].id + 1,
                content: todoElement.value.trim(),
                status:1
            })
        }
    }
    localStorage.setItem('todo',JSON.stringify(todoDb))
    todoElement.value = ''
    renderTodo()
}

function deleteTodo(id:number):void{
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)
    if (confirm('Are you SURE delete it!!!')) {
        let newTodoDb:Todo[] = todoDb.filter((todo:Todo) => todo.id != id)
        localStorage.setItem('todo',JSON.stringify(newTodoDb))
        renderTodo()
    }
}

function openModel(id:number):void{
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)
    let model:HTMLElement = document.querySelector('.modelOverlay') as HTMLElement
    model.style.display = "flex"
    let needTodo:Todo|undefined = todoDb.find((todo:Todo) => todo.id == id)
    model.innerHTML = 
    `
    <div class="model">
        <input class="enterNewTodo" placeholder="${needTodo?.content}" type="text">
        <button onclick="applyTodo(${needTodo?.id})">Apply</button>
        <button onclick="offModel(${needTodo?.id})">Cancel</button>
    </div>
    `
}

function offModel(id:number):void{
    let model:HTMLElement = document.querySelector('.modelOverlay') as HTMLElement
    model.style.display = "none"
}

function applyTodo(id:number):void{
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)
    let needTodo:Todo|undefined = todoDb.find((todo:Todo) => todo.id == id)
    let todoElement:HTMLInputElement = document.querySelector('.enterNewTodo') as HTMLInputElement
    if (confirm('Are you SURE edit this todo?')) {
        let newTodoDb:Todo[] = todoDb.map((todo:Todo) =>{
            if (todo.id == needTodo?.id) {
                return {
                    ...needTodo,
                    content: todoElement.value.trim()
                }as Todo
            }
            return todo
        })
        localStorage.setItem('todo',JSON.stringify(newTodoDb))
        renderTodo()
        offModel(id)
    }
}

function changeStatus(id: number): void {
    let todoDb:Todo[] = JSON.parse(localStorage.getItem('todo') as string)

    let indexOfJob: number = todoDb.findIndex((item: Todo) => item.id == id);
    
    if (todoDb[indexOfJob].status == 1) {
        
        todoDb[indexOfJob].status = 2;
    } else {
        todoDb[indexOfJob].status = 1;
    }
    localStorage.setItem("todo", JSON.stringify(todoDb));
    renderTodo();
}