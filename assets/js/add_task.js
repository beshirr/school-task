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
    document.getElementById("teacher_name_dropdown").value,
    JSON.parse(localStorage.getItem('current_user')).email,
    document.getElementById("priority").value,
    document.getElementById("description").value,
    false
  );
  tasks.push(new_task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  id_counter++;
  localStorage.setItem("id_counter", id_counter);
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
  const teacher = document.getElementById("teacher_name_dropdown").value;
  const priority = document.getElementById("priority").value;
  const description = document.getElementById("description").value;

  if (!title || !teacher || !priority || !description) {
    return false;
  }
  return true;
}

function select_teacher() {
  let teacherSelect = document.getElementById("teacher_name_dropdown");
  let teachers = JSON.parse(localStorage.getItem("users")) || [];
  teachers = teachers.filter((user) => user.is_admin === false);
  teachers.forEach((teacher) => {
    const option = document.createElement("option");
    option.value = teacher.username;
    option.textContent = teacher.username;
    teacherSelect.appendChild(option);
  });
}
