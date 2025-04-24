document.addEventListener("DOMContentLoaded",() => {
    const CurrentTeacher = JSON.parse(localStorage.getItem('current_user')).username;
    const tasks  = JSON.parse(localStorage.getItem("tasks")) || [];
    const assignedTasks = tasks.filter(task => task.name === CurrentTeacher && !task.isCompleted);
    
    const container = document.querySelector(".task-list-container"); // Make sure this exists in your HTML

    container.innerHTML = ''; // Clear the container
  
    assignedTasks.forEach(task => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("card_mb_3");
      taskCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
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
  
    // Refresh the page to show updated tasks
    window.location.reload();
  }