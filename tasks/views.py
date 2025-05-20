from django import forms
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from tasks.models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'priority']

    assigned_to = forms.ModelChoiceField(
        queryset=User.objects.filter(profile__user_type='teacher'),
        label='Assigned to'
    )

# Create your views here.
# @login_required
def assigned_tasks(request):
    return render(request, 'tasks/assigned_tasks.html')


def search_tasks(request):
    user = request.user
    selected_priority = request.GET.get('priority', 'All')
    
    tasks = Task.objects.filter(assigned_to=2)
    
    if selected_priority and selected_priority != 'All':
        tasks = tasks.filter(priority=selected_priority)

    context = {
        'tasks': tasks,
        'selected_priority': selected_priority,
    }
    return render(request, 'tasks/search_tasks.html', context)


def completed_tasks(request):
    return render(request, 'tasks/completed_tasks.html')


def view_task(request, task_id):
    return 'task details'

@csrf_exempt
# @login_required
def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            # pop up window
            return redirect('../tasks_list')
    else:
        form = TaskForm(instance=task)
    return render(request, 'tasks/edit_task.html', {
        'form' : form
    })


@csrf_exempt # remove after authentication
# @login_required
def add_tasks(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            # task.created_by = request.user
            task.created_by = User.objects.get(username='admin_sql')
            assigned_to = form.cleaned_data.get('assigned_to')
            if assigned_to:
                task.assigned_to = assigned_to

            task.save()
            # pop up
            return redirect('tasks:tasks_list')
    else:
        form = TaskForm()
    return render(request, 'tasks/add_task.html', {
        'form' : form
    })


# @login_required
def tasks_list(request):
    admin_user = User.objects.get(username='admin_sql')
    # created_by=request.user
    tasks = Task.objects.filter(created_by=admin_user).order_by('-created_at')
    return render(request, 'tasks/task_list.html', {
        'tasks' : tasks
    })