// Initalizing our empty global storage object
let todoList = localStorage.getItem('todoList');
// Adds an empty array inside our object where
// we gonna save our todo-list tasks
if (todoList === null) {
  todoList = {
    tasks: []
  };
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Gets and returns our localStorage object 'todoList'
getTodoList = () => {
  return JSON.parse(localStorage.getItem('todoList'));
}

// Makes sure to save every state of our object (after 
// adding or removing)
save = (todoList) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  render();
}

// Removes a task from localStorage object 'todoList'
remove = (taskId) => {
  todoList = getTodoList();
  todoList.tasks.splice(taskId, 1);
  save(todoList);
}

// Reverses the task text...
reverse = (taskText) => {
  let reversedTaskText = taskText.split('');
  reversedTaskText.reverse();
  return reversedTaskText.join('');
}

render = () => {
  todoList = getTodoList();
  // Gets previously set tasks from localStore
  // and wraps them with html tags
  let tasksHTML = todoList.tasks.map((taskText, i) => {
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

addTask = (event) => {
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