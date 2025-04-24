function update_dashboard_content() {
    document.addEventListener("DOMContentLoaded", function () {
      try {
        let current_user = JSON.parse(localStorage.getItem("current_user")) || {
          username: "Guest",
        };
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
        const welcomeMsg = document.createElement("h1");
        welcomeMsg.textContent = "Welcome, " + current_user.username;
        document.body.insertBefore(welcomeMsg, document.body.firstChild);
  
        const taskSummaryDiv = document.querySelector(".task-summary");
        if (!taskSummaryDiv) {
          return;
        }
  
        let totalCount = tasks.length;
        let completedCount = 0;
        let pendingCount = 0;
  
        tasks.forEach((task) => {
          if (task.isCompleted) {
            completedCount++;
          } else {
            pendingCount++;
          }
        });
  
        const totalTasksEl = document.createElement("p");
        const pendingTasksEl = document.createElement("p");
        const completedTasksEl = document.createElement("p");
  
        totalTasksEl.textContent = "Total Tasks Created: " + totalCount;
        pendingTasksEl.textContent = "Pending Tasks: " + pendingCount;
        completedTasksEl.textContent = "Completed Tasks: " + completedCount;
  
        const heading = taskSummaryDiv.querySelector("h3");
        taskSummaryDiv.innerHTML = "";
        if (heading) {
          taskSummaryDiv.appendChild(heading);
        }
  
        taskSummaryDiv.appendChild(totalTasksEl);
        taskSummaryDiv.appendChild(pendingTasksEl);
        taskSummaryDiv.appendChild(completedTasksEl);
      } catch (error) {
        console.error("Error updating dashboard content:", error);
      }
    });
  }