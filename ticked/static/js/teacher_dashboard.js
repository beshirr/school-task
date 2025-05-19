document.addEventListener("DOMContentLoaded", () => {

    const currentTeacher = JSON.parse(localStorage.getItem('current_user')).username;
    
    const welcomeMessage = document.querySelector("h1");
    welcomeMessage.textContent = `Welcome, ${currentTeacher}`;
  
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const teacherTasks = tasks.filter(task => task.name === currentTeacher);
  
    const completedTasks = teacherTasks.filter(task => task.isCompleted);
    const pendingTasks = teacherTasks.filter(task => !task.isCompleted);
  
    const totalTasks = teacherTasks.length;
    const pendingCount = pendingTasks.length;
    const completedCount = completedTasks.length;
  
    const taskSummaryDiv = document.querySelector(".task-summary");
    taskSummaryDiv.innerHTML = `
      <h3>Task Summary</h3>
      <p>Total Tasks Assigned: <strong>${totalTasks}</strong></p>
      <p>Pending Tasks: <strong>${pendingCount}</strong></p>
      <p>Completed Tasks: <strong>${completedCount}</strong></p>
    `;
  });
  