from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
# @login_required
def assigned_tasks(request):
    return render(request, 'tasks/assigned_tasks.html')

def search_tasks(request):
    return render(request, 'tasks/search_tasks.html')

def completed_tasks(request):
    return render(request, 'tasks/completed_tasks.html')

def add_tasks(request):
    return render(request, 'tasks/add_task.html')

def tasks_list(request):
    return render(request, 'tasks/task_list.html')