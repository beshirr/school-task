class Task {
  constructor(id, title, name, creator, priority, description, isCompleted) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.creator = creator;
    this.priority = priority;
    this.description = description;
    this.isCompleted = isCompleted;
    this.created_tasks = 0;
  }
}
let id_counter = parseInt(localStorage.getItem("id_counter")) || 1;
let tasks = [];
