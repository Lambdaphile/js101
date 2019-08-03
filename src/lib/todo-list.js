// eslint-disable-next-line no-unused-vars
export default class ToDoList {
  constructor(todoListName) {
    this.todoListName = todoListName;
    this.todoList = {
      tasks: [],
    };

    localStorage.setItem(this.todoListName,
      JSON.stringify(this.todoList));
  }

  save() {
    localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
  }

  remove(taskId) {
    // eslint-disable-next-line no-undef
    localStorage.getItem(this.todoListName);
    this.todoList.tasks.splice(taskId, 1);
    this.save();
  }

  push(newTask) {
    this.todoList.tasks.push(newTask);
    this.save();
  }
}
