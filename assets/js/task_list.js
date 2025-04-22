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
      <button id="edit${task.id}" class="edit-btn actions-button btn" data-task-id="E${task.id}">Edit</button>
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

function edit_task(taskId) {
  const new_title = document.getElementById("new_title").value;
  const new_teacher = document.getElementById("new_teacher").value;
  const new_priority = document.getElementById("new_priority").value;
  const new_description = document.getElementById("new_description").value;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        title: new_title,
        name: new_teacher,
        priority: new_priority,
        description: new_description,
      };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.location.href = "../../pages/admin/task_list.html";
}

function send_current_data_to_edit_form() {
  document.addEventListener("DOMContentLoaded", () => {
    const taskId = JSON.parse(localStorage.getItem("current_edit_task_id"));
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      document.getElementById("new_title").value = task.title;
      document.getElementById("new_teacher").value = task.name;
      document.getElementById("new_priority").value = task.priority;
      document.getElementById("new_description").value =
        task.description || "";
    }
  });
}
