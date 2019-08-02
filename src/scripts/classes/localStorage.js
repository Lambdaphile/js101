export default class LocalStorage {
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
    window.localstorage.getItem(this.todoListName);
    this.todoList.tasks.splice(taskId, 1);
    this.save();
  }
}
