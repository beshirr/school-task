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

function added_task_msg() {
  document.getElementById("addTaskBtn").addEventListener("click", () => {
    show_task_added(() => {});
  });
}
