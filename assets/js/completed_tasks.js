document.addEventListener("DOMContentLoaded", () => {
    const currentTeacher = JSON.parse(localStorage.getItem('current_user')).username;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const completedTasks = tasks.filter(task => task.name === currentTeacher && task.isCompleted);
  
    const container = document.querySelector(".container"); 
  
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");
  
    const thead = document.createElement("thead");
    thead.classList.add("table-dark");
    thead.innerHTML = `
      <tr>
        <th>Task ID</th>
        <th>Title</th>
        <th>Priority</th>
        <th>Description</th>
        <th>Completed On</th>
      </tr>
    `;
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
  
    completedTasks.forEach(task => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td><span class="badge ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-success'}">${task.priority}</span></td>
        <td>${task.description}</td>
        <td>${task.completedOn}</td>
      `;
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
  
    container.appendChild(table);
  
   
  });
  