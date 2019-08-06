import { default as ToDoList } from './lib/todo-list.js';

let newList = document.querySelector('.new-list');

document.querySelector('i').addEventListener('mouseover', (event) => {
  event.target.setAttribute('class', 'black');
});

document.querySelector('.neww-list').addEventListener('click', function(event) {
  event.target.style.display = 'none';
  document.getElementById('list-wrapper').style.visibility = 'visible';
});
newList.addEventListener('click', () => {
  let newTodoList = new ToDoList(prompt('Enter list name'));

  let taskBox = document.createElement('div');
  taskBox.setAttribute('class', 'task-box');

  let ul = document.createElement('ul');
  ul.setAttribute('class', 'todo-list');

  document.querySelector('.board').innerHTML = `
    <p style="margin-left:150px;">${newTodoList.todoListName}</p>
    <p class="new-list2" style="margin-left:400px;">Add New List</p>
    <div class="task-box"></div>
  `;
  document.querySelector('.task-box').innerHTML = `
    <ul class="todo-list"></ul>
  `;

  let addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'add');
  addBtn.textContent = 'Add New task  ';
  document.querySelector('.todo-list').appendChild(addBtn);

  let index = 0;
  document.querySelector('.add').addEventListener('click', () => {
    newTodoList.push(prompt('Enter task:'));

    let li = document.createElement('li');
    
    li.textContent = newTodoList.todoList.tasks[index];
    index++;
    document.querySelector('.todo-list').appendChild(li);
    let remove = document.createElement('span');
    remove.setAttribute('class', 'remove-task');
    remove.setAttribute('data-index', index);
    remove.textContent = ' [Remove]';

    li.appendChild(remove);

    remove.addEventListener('click', (event) => {
      console.log(event.target.getAttribute('data-index'));
      newTodoList.remove('ff');
    });
  });
});

// Initalizing our empty global storage object
let todoList = localStorage.getItem('todoList');
// Adds an empty array inside our object where
// we gonna save our todo-list tasks
if (todoList === null) {
  todoList = {
    tasks: [],
  };
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Gets and returns our localStorage object 'todoList'
function getTodoList() {
  return JSON.parse(localStorage.getItem('todoList'));
}

// Makes sure to save every state of our object (after
// adding or removing)
function save() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  // eslint-disable-next-line no-use-before-define
  render();
}

// Removes a task from localStorage object 'todoList'
function remove(taskId) {
  todoList = getTodoList();
  todoList.tasks.splice(taskId, 1);
  save(todoList);
}

// Reverses the task text...
// function reverse(taskText) {
//   const reversedTaskText = taskText.split('');
//   reversedTaskText.reverse();
//   return reversedTaskText.join('');
// }

function render() {
  todoList = getTodoList();
  // Gets previously set tasks from localStore
  // and wraps them with html tags
  // eslint-disable-next-line arrow-body-style
  const tasksHTML = todoList.tasks.map((taskText, i) => {
    return `<li>
              ${taskText}
              <span class="remove-task" data-taskId="${i}">
                [Remove]
              </span>
            </li>`;
  });

  // Inserts our tasks into the document inside the
  // our unordered-list #todo-list
  const todoListHTML = document.getElementById('todo-list');
  todoListHTML.innerHTML = tasksHTML;

  // Gets each element with class name 'remove-task'
  // and adds 'click' listener to them.
  Array.from(document.getElementsByClassName('remove-task')).forEach((removeBtn) => {
    removeBtn.addEventListener('click', (event) => {
      // When 'remove-task' span is clicked, remove the task from
      // localStorage and document
      remove(event.target.getAttribute('data-taskId'));
    }, false);
  });
}

function addTask(event) {
  // Prevents the form from reloading the page
  event.preventDefault();

  todoList = getTodoList();
  // Gets new task value from todo-lists input
  const newTask = document.getElementById('todo-input').value;

  // Checks for empty strings and null values
  if (newTask.trim().length > 0) {
    // Pushes the new 'task' array into the todoList objects
    todoList.tasks.push(newTask);
    // Save the new task into our localStorage
    save(todoList);
  }
}

// Gets the todo-list's form and listens for submisions
document.getElementById('todo-form').addEventListener('submit', (event) => {
  addTask(event);
  render();
}, false);
