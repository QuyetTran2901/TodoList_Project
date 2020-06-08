//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event Listener
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Function
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //add todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText= todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);// appendChild =>add new element at the last position 
        // add todo to localstorage
        saveLocalTodos(todoInput.value);
        //CHECK MARK BUTTON
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class ="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        //CHECK trash(xoa) BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
        // clear todo input value
        todoInput.value="";
}


function deleteCheck(e){
    const item = e.target;//=>The target event property returns the element that triggered the event
    //DELETE TODO
    if (item.classList[0]==='trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    //check mark

    if (item.classList[0]==="complete-btn") {
        const todo= item.parentElement;
        todo.classList.toggle("completed");// => when u click button complete classList.toggle is going to add new class 'completed'
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }  else{
                    todo.style.display = "none";
                } 
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check ---hey do i already have things in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos(){
    // console.log("hello");
     //check ---hey do i already have things in there?
     if (localStorage.getItem("todos") === null) {
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function (todo) {
          //add todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText= todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);// appendChild =>add new element at the last position 
        //CHECK MARK BUTTON
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class ="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        //CHECK trash(xoa) BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
     });
}

function removeLocalTodos(todo) {
    let todos;
    //check ---hey do i already have things in there?
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex = todo.children[0].innerText;//todo.children =>get text to use array method splice
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}