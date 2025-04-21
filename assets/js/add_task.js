function add_task_button() {
  document.getElementById("addTaskBtn").addEventListener("click", (event) => {
    event.preventDefault();
    create_new_task();
    show_task_added(() => {});
  });
}

function create_new_task() {
  if (!validate_new_task_input()) {
    alert("Please fill in all required fields.");
    return;
  }
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const new_task = new Task(
    id_counter,
    document.getElementById("title").value,
    document.getElementById("teacher").value,
    JSON.parse(localStorage.getItem('current_user')).email,
    document.getElementById("priority").value,
    document.getElementById("description").value,
    false
  );
  tasks.push(new_task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  id_counter++;
  localStorage.setItem("id_counter", id_counter);
  created_new_task = true;
}

function show_task_added(onConfirm) {
  const additionMsg = document.getElementById("taskAdded");
  const backBtn = document.getElementById("backToTasklistBtn");

  additionMsg.style.display = "flex";
  document.body.classList.add("box-open");

  backBtn.onclick = () => {
    additionMsg.style.display = "none";
    window.location.href = "../../pages/admin/task_list.html";
  };
}

function validate_new_task_input() {
  const title = document.getElementById("title").value;
  const teacher = document.getElementById("teacher").value;
  const priority = document.getElementById("priority").value;
  const description = document.getElementById("description").value;

  if (!title || !teacher || !priority || !description) {
    return false;
  }
  return true;
}
