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
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      show_delete_confirm_window(() => {
        // your delete logic here
        console.log("Task deleted!");
      });
    });
  });
}


function signup_validation(){
  document.querySelector("form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm_password").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      event.preventDefault();
      return;
    }

    if (document.getElementById("is_admin").checked){
      window.location.href = "../pages/admin/dashboard.html";
    }
    else{
      window.location.href = "../pages/teacher/dashboard.html";
    }
  });
}
