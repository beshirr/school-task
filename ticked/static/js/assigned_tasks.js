document.addEventListener("DOMContentLoaded",() => {
    const CurrentTeacher = JSON.parse(localStorage.getItem('current_user')).username;
    const tasks  = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Tasks fetched from localStorage: ", tasks);  
    console.log("current teacher: ", CurrentTeacher);
    tasks.forEach(task => {
        console.log("task teacher: " , task.name);
    });

    const assignedTasks = tasks.filter(task => task.name === CurrentTeacher && !task.isCompleted);
    if (assignedTasks.length === 0) {
      show_no_task_msg(() => {});
    }
    const container = document.querySelector(".task-list-container"); 

    container.innerHTML = ''; 
    const header = document.createElement("h1");
    header.textContent = "Assigned Tasks";
    container.appendChild(header);

    assignedTasks.forEach(task => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("card_mb_3");
      taskCard.innerHTML = `
        <div class="card">
          <h2>${task.title}</h2>
          <p>Priority: <span class="badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-success'}">${task.priority}</span></p>
          <p>Description: ${task.description}</p>
          <p>Created by: ${task.creator}</p>
          <button class="btn btn-success" onclick="markTaskCompleted(${task.id})">Mark as Completed</button>
        </div>
      `;
      container.appendChild(taskCard);
    });
  });
  
  function markTaskCompleted(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].isCompleted = true;
      tasks[taskIndex].completedOn = new Date().toLocaleDateString();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    window.location.reload();
  }

  function show_no_task_msg(onConfirm) {
    const additionMsg = document.getElementById("noAssignedTasks");
    const backBtn = document.getElementById("backToTasklistBtn");
  
    additionMsg.style.display = "flex";
    document.body.classList.add("box-open");
  
    backBtn.onclick = () => {
      additionMsg.style.display = "none";
      window.location.href = "../../pages/teacher/dashboard.html";
    }
  }