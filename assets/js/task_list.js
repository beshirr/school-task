function add_task_to_table() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    const task_title = document.createElement("td");
    const teacher_name = document.createElement("td");
    const created_by = document.createElement("td");
    const task_priority = document.createElement("td");
    const actions = document.createElement("td");

    id.textContent = task.id;
    task_title.textContent = task.title;
    teacher_name.textContent = task.name;
    created_by.textContent = task.creator;
    task_priority.textContent = task.priority;

    actions.innerHTML = `
      <button id="edit${task.id}" class="edit-btn actions-button btn">Edit</button>
      <button id="delete${task.id}" class="delete-btn actions-button btn" data-task-id="${task.id}">Delete</button>
    `;

    tr.appendChild(id);
    tr.appendChild(task_title);
    tr.appendChild(teacher_name);
    tr.appendChild(task_priority);
    tr.appendChild(created_by);
    tr.appendChild(actions);

    tbody.appendChild(tr);
  });
}

function init_task_list() {
  add_task_to_table();
}

function delete_task(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskId = parseInt(taskId);

  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  add_task_to_table();
}
