from django import forms
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

from tasks.models import Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'priority']

    assigned_to = forms.ModelChoiceField(
        queryset=User.objects.filter(is_superuser=False),
        label='Assigned to'
    )


@login_required
def assigned_tasks(request):
    tasks = Task.objects.filter(assigned_to=request.user).exclude(status='completed')
    return render(request, 'tasks/assigned_tasks.html', {
        'tasks': tasks
    })


@login_required
def search_tasks(request):
    user = request.user
    selected_priority = request.GET.get('priority', 'All')
    
    tasks = Task.objects.filter(assigned_to=user.id).order_by('-created_at')
    
    if selected_priority and selected_priority != 'All':
        tasks = tasks.filter(priority=selected_priority)

    context = {
        'tasks': tasks,
        'selected_priority': selected_priority,
    }
    return render(request, 'tasks/search_tasks.html', context)


@login_required
def completed_tasks(request):
    tasks = Task.objects.filter(assigned_to=request.user, status='completed')
    return render(request, 'tasks/completed_tasks.html', {
        'tasks': tasks
    })


@login_required
def view_task(request, task_id):
    task = get_object_or_404(Task, id=task_id, assigned_to=request.user)
    return render(request, 'tasks/task_details.html', {
        'task': task
    })


@login_required
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


@login_required
def add_tasks(request):
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.created_by = request.user
            assigned_to = form.cleaned_data.get('assigned_to')
            if assigned_to:
                task.assigned_to = assigned_to

            task.save()
            return JsonResponse({'success' : True})
        else:
            return JsonResponse({'success' : False, 'errors' : form.errors}, status=400)
    else:
        form = TaskForm()
    return render(request, 'tasks/add_task.html', {
        'form' : form
    })


@login_required
def tasks_list(request):
    created_by = request.user
    tasks = Task.objects.filter(created_by=created_by).order_by('-created_at')
    return render(request, 'tasks/task_list.html', {
        'tasks' : tasks
    })


@login_required
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return redirect('tasks:tasks_list')