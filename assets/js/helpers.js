function include(file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    });
}

function show_delete_confirm_window(onConfirm) {
  const delete_confirm = document.getElementById("confirmWindow");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  delete_confirm.style.display = "flex";
  document.body.classList.add("box-open");

  confirmBtn.onclick = () => {
    delete_confirm.style.display = "none";
    document.body.classList.remove("box-open");
    onConfirm();
  };

  cancelBtn.onclick = () => {
    delete_confirm.style.display = "none";
    document.body.classList.remove("box-open");
  };
}

function confirm_delete() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      show_delete_confirm_window(() => {
        // deletion logic in phase 3
        console.log("Task deleted!");
      });
    });
  });
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
  console.log("TESTTTT");

  if (!title || !teacher || !priority || !description) {
    return false;
  }
  return true;
}

function added_task_msg() {
  document.getElementById("addTaskBtn").addEventListener("click", (event) => {
    event.preventDefault();
    if (!validate_new_task_input()) {
      alert("Please fill in all required fields.");
      return;
    }
    show_task_added(() => {});
  });
}

function signup_validation() {
  document.querySelector("form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm_password").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      event.preventDefault();
      return;
    }

    if (document.getElementById("is_admin").checked) {
      window.location.href = "../pages/admin/dashboard.html";
    } else {
      window.location.href = "../pages/teacher/dashboard.html";
    }
  });
}
