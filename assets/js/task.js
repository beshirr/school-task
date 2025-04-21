class Task {
  constructor(id, title, name, creator, priority, description) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.creator = creator;
    this.priority = priority;
    this.description = description;
  }
}
let id_counter = parseInt(localStorage.getItem("id_counter")) || 1;
let tasks = [];
