let created_new_task = false;
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

function signup_validation() {
  document.querySelector("form").addEventListener("submit", function (event) {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm_password").value;
    const is_admin = document.getElementById("is_admin").checked;
    if (!username.trim()) {
      alert("Enter your username");
      event.preventDefault();
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      event.preventDefault();
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match!");
      event.preventDefault();
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    for (let user of users) {
      if (email === user.email) {
        alert("This email is already signed up");
        event.preventDefault();
        return;
      }
      if (username === user.username) {
        alert("This username is already used");
        event.preventDefault();
        return;
      }
    }
    let user = {
      username,
      email,
      password,
      is_admin,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(user));
    if (document.getElementById("is_admin").checked) {
      window.location.href = "../pages/admin/dashboard.html";
    } else {
      window.location.href = "../pages/teacher/dashboard.html";
    }
  });
}

function login_validation() {
  document.querySelector("form").addEventListener("submit", function (event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username.trim() || !password) {
      alert("Please enter both username and password.");
      event.preventDefault();
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      alert("No users found.");
      event.preventDefault();
      return;
    }
    for (let user of users) {
      if (username === user.username && password === user.password) {
        localStorage.setItem("current_user", JSON.stringify(user));
        if (user.is_admin) {
          window.location.href = "../pages/admin/dashboard.html";
        } else {
          window.location.href = "../pages/teacher/dashboard.html";
        }
        return;
      }
    }
    alert("this account does not exist!");
    event.preventDefault();
    return;
  });
}
