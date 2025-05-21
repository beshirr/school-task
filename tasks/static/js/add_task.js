function handle_add_task_form() {
    document.getElementById('taskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch(form.action, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('errorList').innerHTML = '';
                form.reset();
                document.getElementById('taskAdded').style.display = 'block';
            } else {
                let errorHtml = '';
                for (let field in data.errors) {
                  data.errors[field].forEach(msg => {
                    errorHtml += `<li>${field}: ${msg}</li>`;
                  });
                }
                document.getElementById('errorList').innerHTML = errorHtml;
            }
        })
    })
}
