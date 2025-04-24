function include(file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    });
}

function show_delete_confirm_window(onConfirm) {
  console.log("show_delete_confirm_window called");
  const delete_confirm = document.getElementById("confirmWindow");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (!delete_confirm || !confirmBtn || !cancelBtn) {
    console.error("Could not find confirmation window elements");
    return;
  }

  delete_confirm.style.display = "flex";
  document.body.classList.add("box-open");

  confirmBtn.onclick = () => {
    console.log("Confirm button clicked");
    delete_confirm.style.display = "none";
    document.body.classList.remove("box-open");
    onConfirm();
  };

  cancelBtn.onclick = () => {
    console.log("Cancel button clicked");
    delete_confirm.style.display = "none";
    document.body.classList.remove("box-open");
  };
}

function logout(){
  console.log("log out");
  localStorage.setItem("logged_in", false);
  window.location.href = "../../index.html";
}

function starting_index() {
  if (JSON.parse(localStorage.getItem("logged_in")) === false) {
    return;
  }
  current_user = JSON.parse(localStorage.getItem("current_user"));
  if (!current_user) {
    return;
  }
  current_user.is_admin
    ? (window.location.href = "../../pages/admin/dashboard.html")
    : (window.location.href = "../../pages/teacher/dashboard.html");
}
