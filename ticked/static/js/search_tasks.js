function viewTaskDetails(taskId) {
	localStorage.setItem("selectedTaskId", taskId); 
	window.location.href = "task_details.html"; 
}
document.addEventListener("DOMContentLoaded", () => {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const currentTeacher = JSON.parse(
		localStorage.getItem("current_user")
	).username;

	const prioritySelect = document.getElementById("priority");
	const taskListContainer = document.querySelector(".task-list-container");

	function renderTasks(filteredTasks) {
		taskListContainer
			.querySelectorAll(".card")
			.forEach((card) => card.remove());
		filteredTasks.forEach((task) => {
			const taskCard = document.createElement("div");
			taskCard.classList.add("card");
			taskCard.innerHTML = `
          <div class="card-body">
            <h3 class="card-title">${task.title}</h3>
            <p class="card-text">
              Priority: <span class="badge ${
								task.priority === "High"
									? "bg-danger"
									: task.priority === "Medium"
									? "bg-warning text-dark"
									: "bg-success"
							}">${task.priority}</span>
            </p>
            <p>Description: ${task.description}</p>
            <button class="btn actions-button" onclick="viewTaskDetails(${
							task.id
						})">View Details</button>
          </div>
        `;
			taskListContainer.appendChild(taskCard);
		});
	}

	const assignedTasks = tasks.filter((task) => task.name === currentTeacher);
	renderTasks(assignedTasks);

	prioritySelect.addEventListener("change", () => {
		let selectedPriority = prioritySelect.value;
		selectedPriority =
			selectedPriority.charAt(0).toLowerCase() + selectedPriority.slice(1); 

		const filteredTasks =
			selectedPriority === "All"
				? assignedTasks
				: assignedTasks.filter((task) => task.priority === selectedPriority);
		renderTasks(filteredTasks);
	});
});