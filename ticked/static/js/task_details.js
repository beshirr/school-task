document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const selectedTaskId = parseInt(localStorage.getItem("selectedTaskId"));
  
    const selectedTask = tasks.find(task => task.id === selectedTaskId);
  
    if (!selectedTask) {
      console.error("Task not found!");
      document.querySelector(".card").innerHTML = "<p>Task not found!</p>";
      return;
    }
  
    document.querySelector(".card h3").textContent = `Task: ${selectedTask.title}`;
    document.getElementById("task-id").innerHTML = `<span class="label">Task ID:</span> ${selectedTask.id}`;
    document.getElementById("task-priority").innerHTML =` <span class="label">Priority:</span> ${selectedTask.priority}`;
    document.getElementById("task-creator").innerHTML = `<span class="label">Assigned by:</span> ${selectedTask.creator}`;
    document.getElementById("task-description").innerHTML = `
      <span class="label">Description:</span> 
      ${selectedTask.description}
      `;
});